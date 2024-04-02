import { Model, Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    rol: { type: String, required: true, default: "ADMIN" },
    estado: { type: Boolean, required: true, default: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const UsuarioModel: Model<any> = model("usuario", UsuarioSchema);

export default UsuarioModel;