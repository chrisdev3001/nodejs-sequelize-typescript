import express, { Application } from 'express'
import userRoutes from '../routes/usuario'

export default class Server{
    private app: Application
    private port: string
    private paths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8000'

        // Define routes
        this.routes()
    }

    routes(){
        this.app.use( this.paths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`)
        })
    }
}