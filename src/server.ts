import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import clienteRoutes from "./routes/cliente.route";
import usuarioRoutes from "./routes/usuario.route";
import authRoutes from "./routes/auth.route";
import productoRoutes from "./routes/producto.route";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        cliente: "/api/v1/cliente",
        usuario: "/api/v1/usuario",
        auth: "/api/v1/auth",
        producto: "/api/v1/producto",
    };

    constructor () {
        this.app = express();
        this.port = process.env.PORT || "3000";

        //Base de Datos
        dbConnection();

        //Metodos Iniciales
        this.middlewares();

        //Rutas
        this.routes();
    }

    miPrimeraApi() {
        this.app.get("/", (req: Request, res: Response) =>
            res.status(200).json({ msg: "informacion" })
        );
    }

    middlewares() {
        // Lectura del Body
        this.app.use(express.json());

        this.miPrimeraApi();
    }

    routes(): void {
        this.app.use(this.apiPaths.cliente, clienteRoutes);
        this.app.use(this.apiPaths.usuario, usuarioRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.producto, productoRoutes);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

export default Server; 

