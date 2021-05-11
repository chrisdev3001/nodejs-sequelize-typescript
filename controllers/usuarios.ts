import { Request, Response } from "express"
import Usuario from "../models/usuario"


export const getUsuarios = async(req: Request, res: Response) => {
    let usuarios = await Usuario.findAll()
    
    res.json({usuarios})
}

export const getUsuario = async(req: Request, res: Response) => {
    const { id } = req.params

    let usuario = await Usuario.findByPk(id)
    
    !usuario && res.json(`No existe usuario con id: ${id}`)

    res.json(usuario)
}

export const postUsuario = (req: Request, res: Response) => {
    const { body } = req

    console.log(req.body)

    res.json({
        msg: 'postUsuario',
        body
    })
}

export const putUsuario = (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    res.json({
        msg: 'putUsuario',
        body
    })
}

export const deleteUsuario = (req: Request, res: Response) => {
    const { id } = req.params

    res.json({
        msg: 'deleteUsuario',
        id
    })
}