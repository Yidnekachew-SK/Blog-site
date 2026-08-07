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

async function getSinglePostWithComments(postId) {
    return await prisma.posts.findFirst({
        where: { id: postId },
        include: { comments: {
            include: {
                _count: { 
                    select: { likes: true}
                }
            }
        }}
    });
}

async function createPost(title, body, date) {
    await prisma.posts.create({
        data: {
            title,
            article: body,
            createdAt: new Date()
        }
    });
}

async function updatePost(postId, updatedData) {
    await prisma.posts.update({
        where: { id: postId },
        data: { ...updatedData }
    });
}

async function deletePost(postId) {
    await prisma.posts.delete({
        where: { id: postId }
    });
}

module.exports = {
    getPublishedPosts,
    getUnpublishedPosts,
    getSinglePostWithComments,
    createPost,
    updatePost,
    deletePost
}