// const mysql = require("mysql");

// const database = mysql.createConnection({

// });

// database.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Conexion exitosa con la base de datos");
//     }
// });

// const consulta = async (nombre) => {
//     return new Promise((resolve, reject) => {
//         if (!nombre) {
//             reject("Error, verifique los datos");
//         } else {
//             database.query("SELECT * FROM UsuarioNoValidado", (err, results) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(results)
//                 }
//             })
//         }
//     });
// } 

// const llamarConsulta = async () => {
//     console.log("Activando la consulta");
//     try {
//         const sql = await consulta("Dats");
//         console.log(sql);
//     } catch (error) {
//         console.log("Error, promesa rechaza, algo salio mal en la consulta");
//         console.log(error);
//     }
// }

// llamarConsulta();

