const PostsDAO = require('../dao/postsDAO')

module.exports = class PostsController {

  static async apiGetPosts(req, res, next) {
    const posts = await PostsDAO.getPosts()

    res.render('layout', {
      view: 'all_posts',
      posts
    })
  }

  static async apiUpsertPost(req, res, next) {
    const id = req.params.id
    let post

    if (id) {
      post = await PostsDAO.getPostById(id)
    } else {
      post = PostsDAO.createPost()
    }

    if (!post) {
      res.redirect('/')
    }

    res.render('layout', {
      view: 'upsert_post',
      post
    })
  }

  static async apiGetPostById(req, res, next) {
    const post = await PostsDAO.getPostById(req.params.id)

    if (!post) {
      res.redirect('/')
    }

    res.render('layout', {
      view: 'show_post',
      post
    })
  }

  static async apiGetPostBySlug(req, res, next) {
    const post = await PostsDAO.getPostBySlug(req.params.slug)

    if (!post) {
      res.redirect('/')
    }

    res.render('layout', {
      view: 'show_post',
      post
    })
  }

  static async apiAddPost(req, res, next) {
    const post = await PostsDAO.addPost({ ...req.body })

    if (post) {
      res.redirect(`/posts/${post.slug}`)
    }

    res.render('layout', {
      view: 'upsert_post',
      post
    })

  }

}
