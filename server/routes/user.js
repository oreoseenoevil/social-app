const router = require('express').Router()
const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.route('/user/search').get(auth, userController.searchUser)
router.route('/user/:id').get(auth, userController.getUser)

module.exports = router
