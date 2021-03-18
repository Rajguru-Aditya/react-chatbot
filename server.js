//const io = require('socket.io')(3000);
const PORT = process.env.PORT || 3000
const io = require("socket.io")(PORT, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });

const users = {}

io.on('connection', socket => {
  socket.on('new-user', uName => {
    users[socket.id] = uName
    socket.broadcast.emit('user-connected', uName)
  })
  socket.on('disconnect', () => {

    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {message: message, uName: users[socket.id]})
  })
})