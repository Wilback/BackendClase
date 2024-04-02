import { Request, Response } from "express";
import ProductoModel from "../models/producto.model";
import { CustomRequest } from "../middlewares/validate-jwt";

export const crearProducto = async (req: CustomRequest, res: Response) => {
    const { body } = req;
    const id = req._id;

    console.log("El ID del usuario auntenticado", id);
    try {
        const productoNuevo = new ProductoModel({ usuario: id, ...body});
        const productoCreado = await productoNuevo.save();

        res.status(200).json({
            ok: true,
            msg: "Producto registrado satisfactoriamente",
            productoCreado,
        });
    }   catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `Error al crear el producto`,
        });
    }
};

export const getProductos = async (req: Request, res: Response) => {
    try{
        // Devuelve todo el listado de productos con la informacion del usuario que lo creo.
        const productos = await ProductoModel.find().populate({
            path: "usuario",
            select: "nombre, numeroDocumento, email"
        })

        res.json({
            ok: true,
            productos,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
        });
    }
}