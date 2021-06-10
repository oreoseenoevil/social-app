let users = []

const SocketServer = socket => {
  // Connect and disconnect
  socket.on('joinUser', user => {
    users.push({
      id: user._id,
      socketId: socket.id,
      followers: user.followers
    })
  })

  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id)
  })

  // Likes
  socket.on('likePost', newPost => {
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost)
      })
    }
  })

  socket.on('unlikePost', newPost => {
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('unlikeToClient', newPost)
      })
    }
  })

  // Comments
  socket.on('createComment', newPost => {
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
      })
    }
  })

  socket.on('deleteComment', newPost => {
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
      })
    }
  })

  socket.on('likeComment', newPost => {
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeCommentToClient', newPost)
      })
    }
  })

  socket.on('unlikeComment', newPost => {
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('unlikeCommentToClient', newPost)
      })
    }
  })

  // follow and unfollow
  socket.on('follow', data => {
    const user = users.find(user => user.id === data._id)
    user && socket.to(`${user.socketId}`).emit('followToClient', data)
  })

  socket.on('unfollow', data => {
    const user = users.find(user => user.id === data._id)
    user && socket.to(`${user.socketId}`).emit('unfollowToClient', data)
  })
}

module.exports = SocketServer
