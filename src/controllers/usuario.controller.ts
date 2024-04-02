import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";

export const crearUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { login, password } = body;

    try {
        const existeLogin = await UsuarioModel.findOne({
            login: login,
        });

        if (existeLogin) {
            return res.status(409).json({
                ok: false,
                msg: `ya existe el login ${login} creado`,
            });
        }

        const newUsuario = new UsuarioModel({
            ...body,
        });

        const salt = bcrypt.genSaltSync(10);
        newUsuario.password = bcrypt.hashSync(password, salt);

        console.log("Contraseña", newUsuario.password);

        const usuarioCreado = await newUsuario.save();

        res.status(200).json({
            ok: true,
            msg: "Usuario creado satisfactoriamente",
            usuarioCreado,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el usuario, comuniquese con el administrador",
        });
    }
};