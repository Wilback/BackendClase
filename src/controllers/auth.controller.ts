import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";

export const login = async ( req: Request, res: Response ) => {
const { login: loginUser, password } = req.body;

    try {
        // Verificar el login
        const usuario = await UsuarioModel.findOne({ login: loginUser });
        console.log("Contraseña Mongo", usuario);

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas",
            });
        }

        // Verificar el password
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas",
            });
        }

        // generar Token
        const token = await generateJWT(usuario.id, usuario.login);

        res.status(200).json({
            ok: true,
            usuario: usuario,
            token,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }
};

export const renewToken = async (req: CustomRequest, res: Response) => {
    const id = req._id;

  try {
    if (typeof id === "undefined") {
        throw new Error("No existe un id");
    }

    const usuario = await UsuarioModel.findById(id);

    // Generar el Token
    const token = await generateJWT(id.toString());

    res.json({
        ok: true,
        token,
        usuario,
    });
  } catch (error) {
    res.status(400).json({
        ok: false,
        error,
        msg: "Hable con el administrador"
    });
  }
};

export const olvidoContraseña = async (req: Request, res: Response) => {
    const { login, numeroDocumento } = req.body;

    try {
        const existeUsuario = await UsuarioModel.findOne({
            login: login,
            numeroDocumento: numeroDocumento,
        });

        console.log("existeUsuario", existeUsuario);

        if(!existeUsuario) {
            res.status(400).json({
                ok:false,
                msg: "No coinciden sus credenciales",
            });
        }

        console.log("existeUsuario 222", existeUsuario);
        const id = existeUsuario._id;
        // Generar Token

        const token = await generateJWT(
            id,
            login,
            "1H",
            process.env.JWT_SECRET_PASS
        );

        res.status(200).json({
            ok: true,
            msg: "Proceso exitoso",
            usuario: existeUsuario,
            token,
        });
    } catch (error) {
      console.error(error)
      res.status(400).json({
        ok: false,
        msg: "No se logro validar sus credenciales con exito, por favor comuniquese con el administrdor",
      });
    }
};

export const cambioContraseña = async (req: CustomRequest, res: Response) => {
    const id = req._id;
    const { password } = req.body;

    try {

        if (!password) {
            res.status(400).json({
                ok: false,
                msg: "Por favor digite una contraseña valida",
            });
        }
        const newPassword = bcrypt.hashSync(password, 10);
        
        const actualizarPassword = await UsuarioModel.findByIdAndUpdate({
            id,
            password: newPassword,
        });

        if (!actualizarPassword) {
            res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña",
            });
        }
        res.status(200).json({
            ok: true,    
            msg: "Contraseña actualizada",
            usuario: actualizarPassword,
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
        ok: false,
        msg: "Error al actualizar la contraseña, hable con el administrador",
        });
    }
};
