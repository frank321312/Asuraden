import express, { Response, Request } from "express";
import mysql from "mysql";
import { db_connect } from "./dateConnect";
import cors from "cors";
import { validarNombre, validarEmail, validarPassword, validarCodigo } from "./validaciones";
import { insertarUsuarioNoValidado, 
         buscarEmailNoValidado, 
         buscarEmailUsuario,
         obtnerUsuario,
         obtenerDatosPorEmail,
         eliminarUsuarioPorEmail,
         insertarUsuario} from "./consultasSQL";
import { generarNumeroAleatorio, nodemailerCode } from "./nodemailer";
import { RequestBodyUsuario } from "./validaciones";
import { IUsuario } from "./interfaces";

const app = express();
app.use(express.json());
app.use(cors());

export const database = mysql.createConnection({
    user: db_connect.USERNAME,
    host: db_connect.HOST,
    password: db_connect.PASSWORD,
    database: db_connect.DATABASE
});

database.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexion exitosa con la base de datos");
    }
});

const PORT = process.env.PORT || 8000;

var subpilaRegistro = [validarNombre, validarEmail, validarPassword];
var subpilaIniciarSesion = [validarEmail, validarPassword];

app.get("/usuario/email", async (req, res) => {
    const email = req.query.email

    try {
        const date = await obtenerDatosPorEmail(String(email));

        return res.status(200).send(date);
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.post("/registro", subpilaRegistro, async (req: Request, res: Response) => {
    const nombre = req.body.Nombre;
    const email = req.body.Email;
    const password = req.body.Password;

    try {
        await buscarEmailNoValidado(email);
        await buscarEmailUsuario(email);
        return res.status(200).json({ message: "Los datos son validos" });
    } catch (error) {
        console.log("Error, promesa rechazada, datos no validos");
        console.log(error);
        return res.status(400).json({ message: error, err: true });
    }
});

app.post("/enviar-codigo", async (req: Request, res: Response) => {
    const nombre = req.body.Nombre;
    const email = req.body.Email;
    const password = req.body.Password;

    try {
        await insertarUsuarioNoValidado(nombre, email, password, generarNumeroAleatorio());
        const usuario = await obtenerDatosPorEmail(email) as RequestBodyUsuario;
        await nodemailerCode(email, usuario.Codigo);
        console.log("Los datos se insertaron correctamente");
        return res.status(200).json({ message: "Los datos se insertaron correctamente" });
    } catch (error) {
        console.log("Error, promesa rechazada, no se pudieron insertar los datos");
        console.log(error);
        return res.status(400).json({ message: error });
    }
});

app.post("/validar-registro", validarCodigo, async (req: Request, res: Response) => {
    const codigo = req.body.Codigo;
    const email = req.body.Email;

    try {
        await buscarEmailUsuario(email);
        const usuario = await obtenerDatosPorEmail(email) as IUsuario;
        if (usuario.Codigo === Number(codigo)) {
            console.log(usuario);
            await insertarUsuario(usuario.Nombre, usuario.Email, usuario.Contrasena, usuario.Codigo);
            await eliminarUsuarioPorEmail(usuario.Email);
            return res.status(200).json({ message: "Registro exitoso" });
        } 
        return res.status(400).json({ message: "Codigo invalido" });
    } catch (error) {
        console.log("Error, promesa rechazada");
        console.log(error);
        return res.status(400).json({ messagge: error });        
    }
});

app.post("/iniciar-sesion", subpilaIniciarSesion, async (req: Request, res: Response) => {
    const email = req.body.Email;
    const password = req.body.Password;
    
    try {
        var respuesta = await obtnerUsuario(email, password);
        return res.status(200).json({ message: respuesta });
    } catch (error) {
        console.log("Error, promesa rechazada, no se pudieron encontrar los datos");
        console.log(error);
        return res.status(400).json({ message: error });
    }
});

app.delete("/eliminar-usuario", async (req: Request, res: Response) => {
    const email = req.body.Email;

    try {
        await eliminarUsuarioPorEmail(email);
        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        console.log("Error, no se pudo eliminar el usuario");
        console.log(error);
        return res.status(400).json({ message: "No se pudo eliminar el usuario" });        
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});