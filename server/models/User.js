const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { ObjectId } = mongoose.Types

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please add your fullname'],
    trim: true,
    maxLength: [50, 'Maximum at least 50 characters.']
  },
  username: {
    type: String,
    required: [true, 'Please add your username.'],
    minLength: [3, 'Username minimum at least 3 characters.'],
    maxLength: [25, 'Username maximum at least 25 characters.'],
    lowercase: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please add your email.'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add your password.'],
    minLength: [6, 'Password minimum at least 6 characters.']
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user'
  },
  gender: {
    type: String,
    default: 'male'
  },
  mobile: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  story: {
    type: String,
    default: '',
    maxLength: [50, 'Maximum at least 50 characters.']
  },
  website: {
    type: String,
    default: ''
  },
  followers: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  saved: [
    {
      type: ObjectId,
      ref: 'Post'
    }
  ]
}, { timestamps: true })

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', UserSchema)
