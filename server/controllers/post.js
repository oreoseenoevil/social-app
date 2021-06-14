const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

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
      const features = new APIfeatures(Post.find({
        user: [...req.user.following, req.user._id]
      }), req.query).paginating()

      const posts = await features.query.sort('-createdAt')
        .populate('user likes', 'avatar username fullname followers')
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
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password'
          }
        })

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
      const features = new APIfeatures(Post.find({
        user: req.params.id
      }), req.query)
        .paginating()
      const posts = await features.query.sort('-createdAt')

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
  },
  getPostsDiscover: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id]
      
      const num = req.query.num || 9

      const posts = await Post.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } }
      ])

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
  deletePost: async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      })

      await Comment.deleteMany({
        _id: { $in: post.comments }
      })

      return res.status(200).json({
        success: true,
        message: 'Successfully deleted.',
        data: {
          ...post,
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
  savedPost: async (req, res) => {
    try {
      const user = await User.findById({_id: req.user._id })

      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'No user found.'
        })
      }

      if (!user.saved.includes(req.params.id)) {
        await user.updateOne({ $push: {
          saved: req.params.id
        }})

        return res.status(200).json({
          success: true,
          message: 'Post has been saved.'
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  unsavedPost: async (req, res) => {
    try {
      const user = await User.findById({_id: req.user._id})

      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'No user found.'
        })
      }

      if (user.saved.includes(req.params.id)) {
        await user.updateOne({ $pull: {
          saved: req.params.id
        }})

        return res.status(200).json({
          success: true,
          message: 'Post has been unsaved.'
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  getSavedPost: async (req, res) => {
    try {
      const features = new APIfeatures(Post.find({
        _id: { $in: req.user.saved }
      }), req.query).paginating()

      const savedPosts = await features.query.sort('-createdAt')

      return res.status(200).json({
        success: true,
        data: savedPosts,
        result: savedPosts.length
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
