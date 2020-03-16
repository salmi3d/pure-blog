const router = new require('express').Router()
const PostsCtrl = require('./posts.controller')

router.route('/add').get(PostsCtrl.apiUpsertPost)
router.route('/:slug').get(PostsCtrl.apiGetPostBySlug)
router.route('/:id').delete(PostsCtrl.apiDeletePost)

router
  .route('/')
  .get(PostsCtrl.apiGetPosts)
  .post(PostsCtrl.apiAddPost)

module.exports = router
