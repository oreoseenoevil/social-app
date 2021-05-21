const router = require('express').Router()
const userController = require('../controllers/user')

router.route('/user/:id')
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser)

router.get('/user/friends/:userId', userController.getFriends)
router.put('/user/:id/follow', userController.followUser)
router.put('/user/:id/unfollow', userController.unfollowUser)

module.exports = router
