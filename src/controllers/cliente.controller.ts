import { Request, Response } from "express";
import ClienteModel from "../models/cliente.model";

export const crearClientes = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const clienteNuevo = new ClienteModel(body);
        const clienteCreado = await clienteNuevo.save();

        res.status(200).json({
            ok: true,
            msg: "Usuario registrado",
            cliente: clienteCreado,
        });
    }   catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: `Error al crear el cliente ${error}`,
        });
    }
};

export const getClientes = async (req: Request, res: Response) => {
    try {
        //El busca todos los clientes
        const clientes = await ClienteModel.find();
        res.json({
            ok: true,
            clientes,
        });
    }   catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error al consultar los clientes`,
        });
    }
};

export const getUnCliente = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // El busca todos los clientes
        const clientes = await ClienteModel.findById({ _id: id });
        res.json({
            ok: true,
            clientes,
        });
    }   catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error al consultar los clientes`,
        });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    try {
        // El _id del cliente
        const id = req.params.id;
        // const body = req.body;
        const { body } = req;

        // El update todos los clientes
        const clienteActualizo = await ClienteModel.findByIdAndUpdate(id, body, {
            new: true,
        });

        res.json({
            ok: true,
            cliente: clienteActualizo,
        });
    }   catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error al consultar los clientes`,
        });
    }
};

export const updateEstado = async (req: Request, res: Response) => {
    try {
        // El _id del cliente
        const id = req.params.id;
        
        // El update del estado
        const clienteActualizo = await ClienteModel.findByIdAndUpdate(
            id,
            { estado: false },
            {
                new: true,
            }
        );

        res.json({
            ok: true,
            msg: `Cliente Deshabilitado`,
            cliente: clienteActualizo,
        });
    }   catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error al consultar los clientes`,
        });
    }
};
