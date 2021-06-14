const Notify = require('../models/Notify')

const notifyController = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, string, text, content, image } = req.body

      const notify = new Notify({
        id,
        recipients,
        url,
        string,
        text,
        content,
        image,
        user: req.user._id
      })

      await notify.save()

      return res.status(200).json({
        success: true,
        data: notify
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  removeNotify: async (req, res) => {
    try {
      await Notify.findOneAndDelete({
        id: req.params.id,
        url: req.query.url
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  getNotify: async (req, res) => {
    try {
      const notify = await Notify.find({
        recipients: req.user._id
      })
        .sort('-createdAt')
        .populate('user', 'avatar username')

      return res.status(200).json({
        success: true,
        data: notify
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  },
  isReadNotify: async (req, res) => {
    try {
      await Notify.findByIdAndUpdate(req.params.id, {
        isRead: true
      })

      return res.status(200).json({
        success: true
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
}

module.exports = notifyController
