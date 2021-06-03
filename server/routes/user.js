const router = require('express').Router()
const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.route('/user/search')
  .get(auth, userController.searchUser)

router.route('/user/:id')
  .get(auth, userController.getUser)
  .put(auth, userController.updateUser)

router.route('/user/:id/follow')
  .patch(auth, userController.followUser)

router.route('/user/:id/unfollow')
  .patch(auth, userController.unfollowUser)

router.route('/userSuggestion')
  .get(auth, userController.suggestionUser)

module.exports = router
