import { io } from "socket.io-client"

const URL = 'http://localhost:3040'

export const socket = io(URL)