const { body, validationResult, matchedData } = require('express-validator');
const postService = require("../services/postService");

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
        .matches(/^[a-zA-Z0-9\s.,'"!?-]+$/).withMessage('The body must only be letters, numbers or punctuation marks.')
]

async function createPost(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error.array());
    }
}

async function updatePost(req, res) {
    if (req.user.role === 'Admin') {
        await postService.updatePost(Number(req.params.id), req.body);
    } 
}

async function deletePost(req, res) {
    if (req.user.role === 'Admin') {
        await postService.deletePost(Number(req.params.id));
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