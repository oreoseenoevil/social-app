const router = require('express').Router()
const commentController = require('../controllers/comment')
const auth = require('../middleware/auth')

router.route('/comments')
  .post(auth, commentController.createComment)
router.route('/comments/:id')
  .patch(auth, commentController.updateComment)

module.exports = router
