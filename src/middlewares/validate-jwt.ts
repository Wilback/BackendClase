import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

// Amplian funcionalidad de request
// que permite exportar a otras partes del codigo
export interface CustomRequest extends Request {
    _id?: number;
}

const validateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        });
    }

    try {

        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id;

        next();
    }   catch (error) {
        return res.status(401).json({
            ok: false,
            msng: "Token invalido",
        });
    }
};

export default validateJWT;
