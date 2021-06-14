const router = require('express').Router()
const auth = require('../middleware/auth')
const notifyController = require('../controllers/notify')

router.route('/notify')
  .post(auth, notifyController.createNotify)
  .get(auth, notifyController.getNotify)

router.route('/notify/:id')
  .delete(auth, notifyController.removeNotify)
  .patch(auth, notifyController.isReadNotify)

module.exports = router
