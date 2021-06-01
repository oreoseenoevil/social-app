const router = require('express').Router()
const postController = require('../controllers/post')
const auth = require('../middleware/auth')

router.route('/posts')
  .post(auth, postController.createPost)
  .get(auth, postController.getPosts)

router.route('/post/:id')
  .put(auth, postController.updatePost)
  .get(auth, postController.getPost)

router.route('/posts/:id/like').patch(auth, postController.likePost)
router.route('/posts/:id/unlike').patch(auth, postController.unlikePost)

router.route('/user/posts/:id')
  .get(auth, postController.getUserPosts)

router.route('/posts/discover')
  .get(auth, postController.getPostsDiscover)

module.exports = router
