const router = new require('express').Router()
const PostsCtrl = require('./posts.controller')

router.route('/add').get(PostsCtrl.apiAddPost)


router
  .route('/')
  .post(PostsCtrl.apiTest)

module.exports = router
