const { body, validationResult, matchedData } = require('express-validator');
const commentService = require("../services/commentService");
const { prisma } = require('../lib/prisma');

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
        res.json({message: 'comment is added'});
    }
]

async function deleteUserComment(req, res) {
    try {
        const commentId = Number(req.params.id);

        await prisma.commentLikes.deleteMany({
            where: { commentId },
        });
        
        await commentService.deleteComment(commentId);

        res.json({ message: "comment deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete comment" });
    }
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