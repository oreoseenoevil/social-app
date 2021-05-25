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
  }
}

module.exports = userController
