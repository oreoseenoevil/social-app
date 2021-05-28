const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  tag: Object,
  reply: ObjectId,
  likes: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  user: {
    type: ObjectId,
    ref: 'User'
  },
  postId: ObjectId,
  postUserId: ObjectId
}, { timestamps: true })

module.exports = mongoose.model('Comment', CommentSchema)
