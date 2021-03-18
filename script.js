const port = process.env.PORT || 3000
const socket = io(port)
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const uName = window.prompt('What is your name?')
appendMessage('You Joined')
socket.emit('new-user', uName);



socket.on('chat-message', data =>{
    appendMessage(`${data.uName}: ${data.message}`);
})

socket.on('user-connected', uName =>{
    appendMessage(`${uName} connected`);
})

socket.on('user-disconnected', uName =>{
    appendMessage(`${uName} disconnected`);
})


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}