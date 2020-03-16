const router = new require('express').Router()
const PostsCtrl = require('./posts.controller')

router.route('/add').get(PostsCtrl.apiUpsertPost)
router.route('/:id').get(PostsCtrl.apiGetPostById)

router
  .route('/')
  .get(PostsCtrl.apiGetPosts)
  .post(PostsCtrl.apiAddPost)

module.exports = router
