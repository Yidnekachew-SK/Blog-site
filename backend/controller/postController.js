const { body, validationResult, matchedData } = require('express-validator');
const postService = require("../services/postService");
const commentService = require('../services/commentService');
const { prisma } = require('../lib/prisma');

async function getPublishedPosts(req, res) {
    const posts = await postService.getPublishedPosts();
    res.json(posts);
}

async function getUnpublishedPosts(req, res) {
    const posts = await postService.getUnpublishedPosts();
    res.json(posts);
}

async function getPostWithComments(req, res) {
    const post = await postService.getSinglePostWithComments(Number(req.params.id));
    res.json(post);
}

// allow without server side validation
async function createPost(req, res) {
    if (req.user.role != 'Admin') {
        res.status(403).json({ error: "Forbidden" });
    }
    const { title, article } = req.body;
    await postService.createPost(title, article);
    res.json({message: 'post created'});
}

async function updatePost(req, res) {
    if (req.user.role === 'Admin') {
        await postService.updatePost(Number(req.params.id), req.body);
        res.json({ message: "Post updated" })
    } else {
        res.status(403).json({ error: "Forbidden" });
    }
}

async function deletePost(req, res) {
  if (req.user.role === "Admin") {
    try {
        const postId = Number(req.params.id);
        const comments = await prisma.comments.findMany({
            where: { postId },
        });
        
        if (comments.length > 0) {
            for (const comment of comments) {
                await commentService.deleteComment(comment.id);
            }
        }

        await postService.deletePost(postId);

        res.json({ message: "Post deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete post" });
    }
  } else {
        res.status(403).json({ error: "Forbidden" });
  }
}


module.exports = {
    getPublishedPosts,
    getUnpublishedPosts,
    getPostWithComments,
    createPost,
    updatePost,
    deletePost
}