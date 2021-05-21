const User = require('../models/User')

const userController = {
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      })
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'No user found'
        })
      } else {
        return res.status(201).json({
          success: true,
          data: user,
          message: 'Account has been updated.'
        })
      }
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
          error: 'Server Error.'
        })
      }
    }
  },
  deleteUser: async (req, res) => {
    const { isAdmin, userId } = req.body
    if (userId === req.params.id || isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({
          success: true,
          message: 'Acount has been deleted.'
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message
        })
      }
    } else {
      return res.status(403).json({
        success: false,
        error: 'You can delete only your account.'
      })
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password')
        .populate('followers following', '-password')

      return res.status(200).json({
        success: false,
        data: user
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  getFriends: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
      const friends = await Promise.all(
        user.followings.map(friendId => {
          return User.findById(friendId)
        })
      )
      let friendList = []
      friends.map(friend => {
        const { _id, username, profilePicture } = friend
        friendList.push({ _id, username, profilePicture })
      })
      return res.status(200).json({
        success: true,
        data: friendList
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  followUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.user._id)
      if (!user.followers.includes(req.user._id)) {
        await user.updateOne({ $push: { followers: req.user._id} })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        return res.status(200).json({
          success: true,
          message: 'User has been followed.'
        })
      } else {
        return res.status(403).json({
          success: false,
          error: 'You already followed this user.'
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  unfollowUser: async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)

        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId }})
          await currentUser.updateOne({ $pull: { followings: req.params.id } })
          
          return res.status(200).json({
            success: true,
            message: 'User has been unfollowed.'
          })
        } else {
          return res.status(403).json({
            success: false,
            error: 'You don\'t follow this user.'
          })
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message
        })
      }
    } else {
      return res.status(403).json({
        success: false,
        error: 'You can\'t unfollow yourself.'
      })
    }
  }
}

module.exports = userController
