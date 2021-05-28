const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body

      const newPost = new Post({
        content, images, user: req.user._id
      })

      await newPost.save()

      return res.status(200).json({
        success: true,
        data: {
          ...newPost._doc,
          user: req.user
        }
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
}

module.exports = postController
