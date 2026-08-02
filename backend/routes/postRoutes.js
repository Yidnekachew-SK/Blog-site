const { Router } = require('express');
const postContoller = require('../controller/postController');

const postRouter = Router();

postRouter.get('/', postContoller.getPublishedPosts);

postRouter.get('/unpublished', postContoller.getUnpublishedPosts);

postRouter.get('/:id', postContoller.getPostWithComments);

postRouter.post('/:id', postContoller.createPost);

postRouter.put('/:id', postContoller.updatePost);

postRouter.delete('/:id', postContoller.deletePost);

module.exports = postRouter
