const PostsDAO = require('../dao/postsDAO')

module.exports = class PostsController {
  static async apiAddPost(req, res, next) {

    res.render('layout', {
      view: 'upsert_post'
    })

  }

  static async apiTest(req, res, next) {

    res.end()

  }

}
