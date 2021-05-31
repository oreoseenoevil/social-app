const Comment = require('../models/Comment')
const Post = require('../models/Post')

const commentController = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(403).json({
          success: false,
          error: 'Post not found.'
        })
      }

      if (reply) {
        const comment = await Comment.findById(reply)
        if (!comment) {
          return res.status(403).json({
            success: false,
            error: 'Comment not found.'
          })
        }
      }

      const newComment = new Comment({
        user: req.user._id, content, tag, reply, postUserId, postId
      })
      
      await Post.findOneAndUpdate({_id: postId}, {
        $push: { comments: newComment._id }
      }, { new: true })

      await newComment.save()

      return res.status(200).json({
        success: true,
        data: newComment
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body
      await Comment.findOneAndUpdate({
        _id: req.params.id,
        user: req.user._id
      }, { content })

      return res.status(200).json({
        success: true,
        message: 'Successfully updated.'
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
}

module.exports = commentController
