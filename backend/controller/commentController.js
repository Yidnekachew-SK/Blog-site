const { body, validationResult, matchedData } = require('express-validator');
const commentService = require("../services/commentService");

const validateUserComment = [
    body("comment").trim()
        .matches(/^[a-zA-Z0-9\s.,'"!?-]+$/).withMessage('Invalid character used')
]

const createUserComment = [
    validateUserComment,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({error: error.array()})
        }
        const { comment } = matchedData(req);
        await commentService.createComment(comment, req.user.id, Number(req.params.postId));
    }
]

async function deleteUserComment(req, res) {
    await commentService.deleteComment(Number(req.params.id));
}

async function likeUserComment(req, res) {
    const user = req.user.id;
    await commentService.addCommentLike(user, Number(req.params.id))
}

async function unlikeUserComment(req, res) {
    const user = req.user.id;
    await commentService.removeCommentLike(user, Number(req.params.id))
}

module.exports = {
    createUserComment,
    deleteUserComment,
    likeUserComment,
    unlikeUserComment
}