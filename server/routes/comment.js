const router = require('express').Router()
const commentController = require('../controllers/comment')
const auth = require('../middleware/auth')

router.route('/comments')
  .post(auth, commentController.createComment)

router.route('/comments/:id')
  .patch(auth, commentController.updateComment)
  .delete(auth, commentController.deleteComment)

router.route('/comments/:id/like')
  .patch(auth, commentController.likeComment)

router.route('/comments/:id/unlike')
  .patch(auth, commentController.unlikeComment)

module.exports = router
