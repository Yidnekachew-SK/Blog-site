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

const validateCreatePost = [
    body('title').trim()
        .matches(/^[a-zA-Z\s.,'"!?-]+$/).withMessage('Invalid input, only use letters and punctuation marks.'),
    body('body').trim()
        .matches(/^[a-zA-Z0-9\s.,'"!?`<>\-\/=;:()!?\[\]]+$/).withMessage('The body must only be letters, numbers or punctuation marks.')
]

const createPost =  [
    validateCreatePost,
    async (req, res) => {
        if (req.user.role != 'Admin') {
            res.status(403).json({ error: "Forbidden" });
        }
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({errors: error.array()});
        }

        const {title, body} = matchedData(req);
        await postService.createPost(title, body, Number(req.params.id));
        res.json({message: 'post created'});
    }
]

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