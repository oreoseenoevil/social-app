const router = require('express').Router()
const authController = require('../controllers/auth')

router.route('/auth/register').post(authController.register)
router.route('/auth/login').post(authController.login)
router.route('/auth/logout').post(authController.logout)
router.route('/auth/token').get(authController.generateToken)

module.exports = router
