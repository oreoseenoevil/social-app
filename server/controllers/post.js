const Post = require('../models/Post')
// const Comment = require('../models/Comment')
// const User = require('../models/User')

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
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({
        user: [...req.user.following, req.user._id]
      }).sort('-createdAt')
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password'
          }
        })

      return res.status(200).json({
        success: true,
        data: posts,
        result: posts.length
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body
      const post = await Post.findByIdAndUpdate({_id: req.params.id}, {
        content,
        images
      }).populate('user likes', 'avatar username fullname')

      return res.status(200).json({
        success: true,
        data: {
          ...post._doc,
          content,
          images
        },
        message: 'Post updated.'
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(403).json({
          success: false,
          error: 'No post found.'
        })
      }

      if (!post.likes.includes(req.user._id)) {
        await post.updateOne({ $push: {
          likes: req.user._id
        }})

        return res.status(200).json({
          success: true,
          message: 'Post has been liked.'
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  unlikePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(403).json({
          success: false,
          error: 'No post found.'
        })
      }

      if (post.likes.includes(req.user._id)) {
        await post.updateOne({ $pull: {
          likes: req.user._id
        }})

        return res.status(200).json({
          success: true,
          message: 'Post has been unliked.'
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const posts = await Post.find({user: req.params.id})
        .sort('-createdAt')

      return res.status(200).json({
        success: true,
        data: posts,
        result: posts.length
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate('user likes', 'avatar username fullname followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password'
          }
        })

      if (!post) {
        return res.status(400).json({
          success: false,
          error: 'No post found.'
        })
      }

      return res.status(200).json({
        success: true,
        data: post
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
