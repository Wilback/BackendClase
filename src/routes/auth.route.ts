import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { cambioContraseña, login, olvidoContraseña, renewToken } from "../controllers/auth.controller";
import validateJWT from "../middlewares/validate-jwt";

// path: /api/v1/auth
const router = Router();

router.post(
    "/",
    [
        check("login", "El login es obligatorio").not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validateFields,
    ],
    login
);

router.post(
    "/olvidocontraseña",
    [
        check("login", "El login es obligatorio").not().isEmpty(),
        check("numeroDocumento", "El documento es obligatorio").not().isEmpty(),
        validateFields,
    ],
    olvidoContraseña
);

router.put(
    "/cambiocontraseña",
    [
        check("password", "El password es obligatorio").not().isEmpty(),
        validateFields,
    ],
    cambioContraseña
);

router.get("/", validateJWT, renewToken);

export default router;