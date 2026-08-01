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

async function updateComment(commentId, updatedComment) {
    await prisma.comments.update({
        where: { id: commentId },
        data: { updatedComment }
    });
}

async function deleteComment(commentId) {
    await prisma.comments.delete({
        where: { id: commentId}
    });
}