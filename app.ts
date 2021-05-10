import Server from "./models/server"

// import dotenv from 'dotenv'   <--- it doesnt work
// dotenv.config()               <--- it doesnt work
// Configurar dotenv
require('dotenv').config()

const server = new Server()

server.listen()

