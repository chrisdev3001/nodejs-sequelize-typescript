import { Request, Response } from "express"
import Usuario from "../models/usuario"


export const getUsuarios = async(req: Request, res: Response) => {
    let usuarios = await Usuario.findAll(/*{where: {estado: true}}*/)
    
    res.json({usuarios})
}

export const getUsuario = async(req: Request, res: Response) => {
    const { id } = req.params

    let usuario = await Usuario.findByPk(id)
    
    !usuario && res.json(`No existe usuario con id: ${id}`)

    res.json(usuario)
}

export const postUsuario = async(req: Request, res: Response) => {
    const { body } = req
    
    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json('Ya existe usuario con email: '+body.email)
        }

        const usuario = Usuario.build(body)
        usuario.save()

        res.json({usuario})
    } catch (error) {
        res.status(500).json('Error al guardar en db')
    }
    
}

export const putUsuario = async(req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    try {
        const usuario = await Usuario.findByPk(id)

        if(!usuario) {
            return res.status(400).json('No existe un usuario con id: '+id)
        }

        await usuario.update(body)
        
        res.json(usuario)
    } catch (error) {
        res.status(500).json('Error al guardar en db')
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {
    const { id } = req.params

    const usuario = await Usuario.findByPk(id)

    if(!usuario) {
        return res.status(400).json('No existe un usuario con id: '+id)
    }

    await usuario.update({ estado: false }) //  <--- DELETE LÓGICO
    // await usuario.destroy()  <--- DELETE FÍSICO


    res.json('Usuario borrado')
}