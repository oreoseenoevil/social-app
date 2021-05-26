const User = require('../models/User')

const userController = {
  searchUser: async (req, res) => {
    try {
      const user = await User.find({username: {$regex: req.query.username}}).limit(10).select('fullname username avatar')

      return res.status(200).json({
        success: true,
        data: user
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password')
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User doesn\'t exist.'
        })
      }

      return res.status(201).json({
        success: true,
        data: user
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  updateUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body)

      return res.status(201).json({
        success: false,
        message: 'Successfully Updated.'
      })
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message)

        return res.status(400).json({
          success: false,
          error: messages
        })
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        })
      }
    }
  }
}

module.exports = userController
