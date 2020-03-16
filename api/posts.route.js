const router = new require('express').Router()
const PostsCtrl = require('./posts.controller')

router.route('/add').get(PostsCtrl.apiUpsertPost)
router.route('/edit/:id').get(PostsCtrl.apiUpsertPost)
router.route('/:slug').get(PostsCtrl.apiGetPostBySlug)
router.route('/:id')
  .delete(PostsCtrl.apiDeletePost)
  .put(PostsCtrl.apiUpdatePost, PostsCtrl.apiSavePostAndRedirect())

router
  .route('/')
  .get(PostsCtrl.apiGetPosts)
  .post(PostsCtrl.apiAddPost, PostsCtrl.apiSavePostAndRedirect())

const index = PostsCtrl.apiGetPosts

module.exports = { router, index }
