import nodemailer, { createTransport } from "nodemailer";
import { email_connect } from "./dateConnect";

export function generarNumeroAleatorio() {
    // Genera un número aleatorio entre 0 y 99999999 (8 dígitos)
    var numero = Math.floor(Math.random() * 100000000);

    return numero;
}

// export const nodemailerCode = async (Email: string, Codigo: number | undefined) => {
//     return new Promise((resolve, reject) => {
//         const traportar = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 type: 'OAuth2',
//                 user: 'hectorsacaca1123@gmail.com',
//                 clientId: email_connect.clientId,
//                 clientSecret: email_connect.clientSecret,
//                 refreshToken: email_connect.refreshToken,
//                 accessToken: email_connect.accessToken
//             }
//         });

//         var mailOptions = {
//             from: "hectorsacaca1123@gmail.com",
//             to: Email,
//             subject: "Codigo de verificación",
//             text: `<h2>${Codigo}</h2>`
//         }

//         traportar.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 reject("Error, no se pudo enviar el email");
//             } else {
//                 resolve(`Envio con exito: ${info.response}`);
//             }
//         })
//     });
// }

export const nodemailerCode = async (Email: string, Codigo: number | undefined) => {
    const traportar = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: 'hectorsacaca1123@gmail.com',
            clientId: email_connect.clientId,
            clientSecret: email_connect.clientSecret,
            refreshToken: email_connect.refreshToken,
            accessToken: email_connect.accessToken
        }
    });

    var mailOptions = {
        from: "hectorsacaca1123@gmail.com",
        to: Email,
        subject: "Codigo de verificación",
        text: `<h2>${Codigo}</h2>`
    };

    try {
        const info = await traportar.sendMail(mailOptions);
        return `Envio con exito: ${info.response}`;
    } catch (error) {
        console.error("Error, no se pudo enviar el email:", error);
        throw new Error("Error, no se pudo enviar el email");
    }
};