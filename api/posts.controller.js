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
    req.post = PostsDAO.createPost({ ...req.body })
    next()
  }

  static async apiUpdatePost(req, res, next) {
    req.post = await PostsDAO.getPostById(req.params.id)
    next()
  }

  static apiSavePostAndRedirect() {
    return async (req, res) => {
      let post = req.post
      post.title = req.body.title
      post.description = req.body.description
      post.markdown = req.body.markdown
      try {
        post = await PostsDAO.savePost(post)
        res.redirect(`/posts/${post.slug}`)
      } catch (e) {
        res.render('layout', {
          view: 'upsert_post',
          post
        })
      }
    }
  }

  static async apiDeletePost(req, res, next) {
    try {
      const deleteResult = await PostsDAO.deletePost(req.params.id)
      const { error } = deleteResult
      if (error) {
        res.status(500).json({ error })
        return
      }
      res.redirect('/')
    } catch (e) {
      res.status(500).json(e)
    }
  }

}
