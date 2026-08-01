const { prisma } = require('../lib/prisma');

async function createUser(name, username, password) {
    await prisma.users.create({
        data: {
            name,
            username,
            password
        }
    });
}

async function getUserByUsername(username) {
    return await prisma.users.findUnique({
        where: { username }
    });
}

async function updateUserInfo(userId, updatedData) {
    await prisma.users.update({
        where: { id: userId},
        data: { updatedData }
    });
}

module.exports = {
    createUser,
    getUserByUsername,
    updateUserInfo
}