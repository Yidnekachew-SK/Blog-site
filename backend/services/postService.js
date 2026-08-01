const { prisma } = require('../lib/prisma');

async function getPublishedPosts() {
    return await prisma.posts.findMany({
        where: { status: "published" }
    });
}

async function getUnpublishedPosts() {
    return await prisma.posts.findMany({
        where: { status: "unpublished" }
    });
}

async function getPostsWithComments() {
    return await prisma.posts.findMany({
        where: { status: "published" },
        include: { comments: true }
    });
}

async function getSinglePostWithComments(postId) {
    return await prisma.posts.findFirst({
        where: { id: postId },
        include: { comments: true }
    });
}

async function createPost(title, body, date) {
    await prisma.posts.create({
        data: {
            title,
            article: body,
            createdAt: date
        }
    });
}

async function UpdatePost(postId, updatedData) {
    await prisma.posts.update({
        where: { id: postId },
        data: { updatedData }
    });
}

async function deletePost(postId) {
    await prisma.posts.delete({
        where: { id: postId }
    });
}

async function increaseLikeCount(postId) {
    await prisma.posts.update({
        where: { id: postId },
        data: { likeCount: likeCount + 1}
    })
}

module.exports = {
    getPublishedPosts,
    getUnpublishedPosts,
    getPostsWithComments,
    getSinglePostWithComments,
    createPost,
    UpdatePost,
    deletePost,
    increaseLikeCount
}