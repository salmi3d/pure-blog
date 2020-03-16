const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const { JSDOM } = require('jsdom')
const dompurify = require('dompurify')(new JSDOM().window)

module.exports = class PostsDAO {

  static getPostModel() {
    const postSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String
      },
      markdown: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      sanitizedHtml: {
        type: String,
        required: true
      }
    })

    postSchema.pre('validate', function (next) {
      if (this.title) {
        this.slug = slugify(this.title, {
          lower: true,
          strict: true
        })
      }

      if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
      }

      next()
    })

    if (mongoose.models && mongoose.models.Post) {
      return mongoose.models.Post
    }

    return mongoose.model('Post', postSchema)
  }

  static async getPosts() {
    const PostModel = PostsDAO.getPostModel()
    try {
      return await PostModel.find().sort({
        createdAt: -1
      })
    } catch (e) {
      console.error(e)
      return []
    }
  }

  static async getPostById(id) {
    try {
      const _id = mongoose.Types.ObjectId(id)

      return await PostsDAO.getPostModel().findById(_id)
    } catch (e) {
      console.error(e)
      return null
    }
  }

  static async getPostBySlug(slug) {
    try {
      return await PostsDAO.getPostModel().findOne({ slug })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  static createPost(post) {
    const PostModel = PostsDAO.getPostModel()

    return new PostModel(post)
  }

  static async savePost(post) {
    try {
      return await post.save()
    } catch (e) {
      console.error(`Unable to save post: ${e}`)
      return null
    }
  }

  static async deletePost(id) {
    try {
      const _id = mongoose.Types.ObjectId(id)
      return await PostsDAO.getPostModel().findByIdAndDelete(_id)
    } catch (e) {
      console.error(`Error occurred while deleting post, ${e}`)
      return { error: e }
    }
  }

}
