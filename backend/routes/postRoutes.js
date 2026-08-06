const { Router } = require('express');
const postContoller = require('../controller/postController');
const passport_jwt = require('../middleware/passport-jwt');

const postRouter = Router();

postRouter.get('/', postContoller.getPublishedPosts);

postRouter.get('/unpublished', passport_jwt.authenticate('jwt', {session: false}), postContoller.getUnpublishedPosts);

postRouter.get('/:id', passport_jwt.authenticate('jwt', {session: false}), postContoller.getPostWithComments);

postRouter.post('/:id', passport_jwt.authenticate('jwt', {session: false}), postContoller.createPost);

postRouter.put('/:id', passport_jwt.authenticate('jwt', {session: false}), postContoller.updatePost);

postRouter.delete('/:id', passport_jwt.authenticate('jwt', {session: false}), postContoller.deletePost);

module.exports = postRouter
