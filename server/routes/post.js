const router = require('express').Router()
const postController = require('../controllers/post')
const auth = require('../middleware/auth')

router.route('/posts')
  .post(auth, postController.createPost)
  .get(auth, postController.getPosts)

router.route('/post/:id')
  .put(auth, postController.updatePost)
  .get(auth, postController.getPost)
  .delete(auth, postController.deletePost)

router.route('/posts/:id/like')
  .patch(auth, postController.likePost)
router.route('/posts/:id/unlike')
  .patch(auth, postController.unlikePost)

router.route('/user/posts/:id')
  .get(auth, postController.getUserPosts)

router.route('/posts/discover')
  .get(auth, postController.getPostsDiscover)

router.route('/posts/saved')
  .get(auth, postController.getSavedPost)

router.route('/user/:id/saved')
  .patch(auth, postController.savedPost)
router.route('/user/:id/unsaved')
  .patch(auth, postController.unsavedPost)

module.exports = router
