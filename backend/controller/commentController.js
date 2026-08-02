const { body, validationResult, matchedData } = require('express-validator');
const commentService = require("../services/commentService");

const validateUserComment = [

]

const createUserComment = [
    validateUserComment,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return 
        }
        const {  } = matchedData(req);
        const posts = await commentService.createComment(Number(req.params.postId), );
        res.json(posts);
    }
]

async function deleteUserComment(req, res) {
    const post = await commentService.deleteComment(Number(req.params.id));
    res.json(post);
}

async function likeUserComment(req, res) {
    const user = 
    await commentService.addCommentLike(user, Number(req.params.id))
}

async function unlikeUserComment(req, res) {
    const user = 
    await commentService.removeCommentLike(user, Number(req.params.id))
}

module.exports = {
    createUserComment,
    deleteUserComment,
    likeUserComment,
    unlikeUserComment
}