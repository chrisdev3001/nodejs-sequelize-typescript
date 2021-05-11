import express, { Application } from 'express'
import cors from 'cors'
import userRoutes from '../routes/usuario'
import db from '../db/connection'

export default class Server{
    private app: Application
    private port: string
    private paths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8000'

        // Initial methods
        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        // Configured cors
        this.app.use(cors())

        // Read body post
        this.app.use(express.json())

        // Public folder
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use( this.paths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`)
        })
    }

    dbConnection(){
        db.authenticate()
        .then(()=> console.log('DB Online'))
        .catch(()=> console.log('DB Offline'))
    }
}