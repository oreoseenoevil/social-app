const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const NotifySchema = new mongoose.Schema({
  id: ObjectId,
  user: {
    type: ObjectId,
    ref: 'User'
  },
  recipients: [
    ObjectId
  ],
  url: String,
  text: String,
  content: String,
  image: String,
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Notify', NotifySchema)
