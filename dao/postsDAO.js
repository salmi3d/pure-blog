const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

module.exports = class PostsDAO {

  static getPostModel() {
    const postSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
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
      slug: {
        type: String,
        required: true,
        unique: true
      }
    })

    postSchema.pre('validate', function (next) {
      if (this.title) {
        this.slug = slugify(this.title, {
          lower: true,
          strict: true
        })
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
    } catch (error) {
      console.log(error)
      return []
    }
  }

  static createPost(post) {
    const PostModel = PostsDAO.getPostModel()

    return new PostModel(post)
  }

  static async getPostById(id) {
    try {
      const _id = mongoose.Types.ObjectId(id)
      return await PostsDAO.getPostModel().findById(_id)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async getPostBySlug(slug) {
    try {
      return await PostsDAO.getPostModel().findOne({ slug })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async addPost(post) {
    const newPost = PostsDAO.createPost(post)

    try {
      return await newPost.save()
    } catch (error) {
      console.log(error)
      return null
    }
  }

}
