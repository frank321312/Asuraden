import { Response, Request, NextFunction } from "express";

export interface RequestBodyUsuario {
    Nombre?: string;
    Email?: string;
    Password?: string;
    Codigo?: number;
}

export const validarNombre = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as RequestBodyUsuario;
    const { Nombre } = body
    console.log(req.body);
    if (!Nombre || Nombre.length < 3 || Nombre[0] == " " || Nombre[Nombre.length - 1] == " " || Nombre.length > 30) {
        return res.status(400).json({ message: "Nombre invalido", nombre: true, email: false, password: false });
    } 
    next();
}

export const validarEmail = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as RequestBodyUsuario;
    const { Email } = body;

    if (!Email || Email.length < 11 || Email[0] == " " || Email[Email.length - 1] == " " || Email.length > 45 || Email.indexOf("@gmail.com") == -1) {
        return res.status(400).json({ message: "Email invalido" , email: true, nombre: false, password: false });
    }
    next();
}

export const validarPassword = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as RequestBodyUsuario;
    const { Password } = body;

    if (!Password || Password[0] == " " || Password[Password.length - 1] == " " || Password.length > 25 || Password.length < 3) {
        return res.status(400).json({ message: "Contraseña invalida", password: true, email: false, nombre: false });
    }
    next();
}

export const validarCodigo = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as RequestBodyUsuario;
    const { Codigo } = body;

    if (Codigo == undefined || isNaN(Number(Codigo)) || Codigo.toString()[0] == " " || Codigo.toString()[Codigo.toString().length - 1] == " ") {
        return res.status(400).json({ message: "Codigo invalido" });
    }
    next();
}