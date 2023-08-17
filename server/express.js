const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, _, next) => {
    console.log(`HTTP METHOD: ${req.method}, ${req.url}, ${req.body}`)
    next()
})

io.on('connect', (socket) => {
    console.log('Client connected: ', socket.id)

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected, Reason: ', reason)
    })

    socket.on('message', (message) => {
        socket.broadcast.emit("new_message", message)
    })
})

server.listen(3040, () => console.log('Server running on Port: 3040'))