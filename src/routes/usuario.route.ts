import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { crearUsuario } from "../controllers/usuario.controller";
import validateJWT from "../middlewares/validate-jwt";

// path: /api/v1/usuario
const router = Router();

router.post(
    "/",
    validateJWT,
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty().isEmail(),
        check("tipoDocumento", "El tipo de documento es obligatorio").not().isEmpty(),
        check("numeroDocumento", "El numero de documento es obligatorio").not().isEmpty(),
        check("login", "El login es obligatorio").not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validateFields,
    ],
    crearUsuario
);

export default router;
