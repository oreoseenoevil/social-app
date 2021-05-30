const router = require('express').Router()
const postController = require('../controllers/post')
const auth = require('../middleware/auth')

router.route('/posts')
  .post(auth, postController.createPost)
  .get(auth, postController.getPosts)

router.route('/posts/:id')
  .put(auth, postController.updatePost)

router.route('/posts/:id/like').patch(auth, postController.likePost)
router.route('/posts/:id/unlike').patch(auth, postController.unlikePost)

module.exports = router
