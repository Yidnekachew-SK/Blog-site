const { Router } = require('express');
const commentController = require('../controller/commentController');

const commentRouter = Router();

//commentRouter.get('/', );

commentRouter.post('/', commentController.createUserComment);

commentRouter.delete('/:id', commentController.deleteUserComment);

commentRouter.post('/:id/likes', commentController.likeUserComment);

commentRouter.delete('/:id/likes', commentController.unlikeUserComment)

module.exports = commentRouter
