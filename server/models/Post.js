const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const PostSchema = new mongoose.Schema({
  content: String,
  images: {
    type: Array
  },
  likes: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ],
  user: {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)
