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
  }
}

module.exports = userController
