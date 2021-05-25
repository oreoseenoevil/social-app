const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/keys')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(403).json({
        success: false,
        error: 'Invalid Authentication'
      })
    }

    const decoded = jwt.verify(token, secretKey)
    if (!decoded) {
      return res.status(403).json({
        success: false,
        error: 'Invalid Authentication'
      })
    }

    const user = await User.findOne({_id: decoded.id})

    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = auth
