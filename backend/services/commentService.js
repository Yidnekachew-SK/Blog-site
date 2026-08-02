const { prisma } = require('../lib/prisma');

async function createComment(comment, userId, postId) {
    await prisma.comments.create({
        data: {
            comment,
            userId,
            postId
        }
    });
}

async function deleteComment(commentId) {
    await prisma.comments.delete({
        where: { id: commentId}
    });
}

async function addCommentLike(userId, commentId) {
    await prisma.commentLikes.create({
        data: {
            userId,
            commentId
        }
    })
}

async function removeCommentLike(userId, commentId) {
    await prisma.commentLikes.delete({
        where: {
            userId,
            commentId
        }
    })
}

module.exports = {
    createComment,
    deleteComment,
    addCommentLike,
    removeCommentLike
}