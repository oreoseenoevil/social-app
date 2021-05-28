const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { production, secretKey, secretKey2 } = require('../config/keys')

const authController = {
  register: async (req, res) => {
    try {
      const { email, username } = req.body
      const emailExist = await User.findOne({ email })
      const userExist = await User.findOne({ username })

      if (emailExist) {
        return res.status(400).json({
          success: false,
          error: 'This email already in used.'
        })
      }
      if (userExist) {
        return res.status(400).json({
          success: false,
          error: 'This username already in used.'
        })
      }

      const user = await User.create(req.body)

      const accessToken = createAccessToken({ id: user._id })
      const refreshToken = createRefreshToken({ id: user._id })

      res.cookie('mern_session', refreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: production,
        sameSite: 'Strict'
      })


      return res.status(201).json({
        success: true,
        data: {
          ...user._doc,
          password: ''
        },
        message: 'Successfully Registered.',
        access: accessToken
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
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
        .populate('followers following', '-password')

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Email does not exist.'
        })
      }

      if (user && (await user.matchPassword(password))) {
        const accessToken = createAccessToken({ id: user._id })
        const refreshToken = createRefreshToken({ id: user._id })

        res.cookie('mern_session', refreshToken, {
          httpOnly: true,
          path: '/',
          maxAge: 30 * 24 * 60 * 60 * 1000,
          secure: production,
          sameSite: 'Strict'
        })

        return res.status(200).json({
          success: true,
          data: {
            ...user._doc,
            password: ''
          },
          message: 'Successfully Login.',
          access: accessToken
        })

      } else {
        return res.status(401).json({
          success: false,
          error: 'Incorrect Password'
        })
      }

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('mern_session', {
        path: '/'
      })

      return res.status(200).json({
        success: true,
        message: 'Successfully logged out.'
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  generateToken: (req, res) => {
    try {
      const token = req.cookies.mern_session

      jwt.verify(token, secretKey2, async (err, result) => {
        if (err) {
          return res.status(401).json({
            success: false,
            error: 'Please login to continue.'
          })
        }

        const user = await User.findById(result.id).select('-password')
          .populate('followers following', 'avatar username fullname followers following')

        if (!user) {
          return res.status(400).json({
            success: false,
            error: 'User does not exist.'
          })
        }

        const accessToken = createAccessToken({ id: result.id })

        return res.status(200).json({
          success: true,
          data: user,
          access: accessToken
        })
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
}

const createAccessToken = user => {
  return jwt.sign(user, secretKey, { expiresIn: '1d' })
}

const createRefreshToken = user => {
  return jwt.sign(user, secretKey2, { expiresIn: '1d' })
}

module.exports = authController
