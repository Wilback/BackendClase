// path: /api/v1/cliente

import { Router } from "express";
import { 
    crearClientes, 
    getClientes,
    getUnCliente,
    updateCliente,
    updateEstado,
    deleteCliente,
} from "../controllers/cliente.controller"
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post(
    "/",
    validateJWT,
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty().isEmail(),
        check("telefono", "El telefono es obligatorio").not().isEmpty(),
        check("tipoDocumento", "El tipo de documento es obligatorio")
            .not()
            .isEmpty(),
        check("numeroDocumento", "El numero de documento es obligatorio")    
            .not()
            .isEmpty(),

        validateFields,
    ],
    crearClientes
);
router.get("/", validateJWT, getClientes);
router.get("/:id", validateJWT, getUnCliente);
router.get("/:id", validateJWT, updateCliente);
router.get("/estado/:id", validateJWT, updateEstado);
router.get("/:id", validateJWT, deleteCliente);

export default router;
