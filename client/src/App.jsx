import { useEffect, useState } from "react"
import { socket } from "./socket"

import "./App.css"

export default function App() {
  const [message, setMessage] = useState("Type Something")

  useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      console.log('Connection with server established, Id: ', socket.id)
    })

    socket.on('new_message', (newMessage) => {
      setMessage(newMessage)
    })

    socket.emit('client_message', "Hello there, I am your client")

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.emit('message', message)
  }, [message])

  return (
    <div className="message-container">
      <p className="message">{message}</p>
      <input className="input" onChange={(evt) => setMessage(evt.target.value)} type="text" name="message" id="message" />
    </div>
  )
}