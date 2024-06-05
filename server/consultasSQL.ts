import { database } from ".";

// Insertar datos en la tabla UsuarioNoValidado
export const insertarUsuarioNoValidado = async (Nombre: string, Email: string, Password: string, Codigo: number) => {
    const altaUsuarioNoValidado = `CALL altaUsuarioNoValidado(?,?,?,?)`;
    return new Promise((resolve, reject) => {
        if (!Nombre || !Email || !Password) {
            reject("Error, datos invalidos");
        } else {
            database.query(altaUsuarioNoValidado, [Nombre, Email, Password, Codigo], (err, _results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Datos insertados correctamente");
                }
            });  
        }  
    });
}

// Inserta datos en la tabla Usuario
export const insertarUsuario = async (Nombre: string, Email: string, Password: string, Codigo: number) => {
    const altaUsuario = `CALL altaUsuario(?,?,?,?)`;
    return new Promise((resolve, reject) => {
        if (!Nombre || !Email || !Password) {
            reject("Error, datos invalidos de usuario");
        } else {
            database.query(altaUsuario, [Nombre, Email, Password, Codigo], (err, _results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Datos insertados correctamente");
                }
            });  
        }  
    });
}

// Verifica que el usuario no exista en la tabla UsuarioNoValidado, si existe quiere decir que el
// Email esta en uso por lo que lanzara un error
export const buscarEmailNoValidado = async (Email: string) => {
    const queryEmail = "CALL obtenerEmailNoValidado(?)";

    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Error, dato invalido");
        } else {
            database.query(queryEmail, [Email], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results[0].length > 0) {
                    reject("Error, email en uso");
                } else {
                    resolve("Datos insertados correctamente");
                }
            })
        }
    });
}


// Verifica que en la tabla Usuario no existe el email que le pasamos como argumento, si existe lanzara un error
export const buscarEmailUsuario = async (Email: string) => {
    const queryEmail = "CALL obtenerEmail(?)";

    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Error, dato invalido");
        } else {
            database.query(queryEmail, [Email], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results[0].length > 0) {
                    reject("Error, email en uso");
                } else {
                    resolve("Datos insertados correctamente");
                }
            })
        }
    });
}

// Verificar que el usuario exista en la tabla Usuario, si existe validara que la contraseña sea igual
// Si no lo es lanzara un error, lo mismo para el Email si no existe se asume que el usuario no existe
export const obtnerUsuario = async (Email: string, Password: string) => {
    const queryEmail = "CALL obtenerEmail(?)";

    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Error, dato invalido");
        } else {
            database.query(queryEmail, [Email], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results[0].length > 0) {
                    if (Password == results[0][0].Contrasena) {
                        console.log(Password);
                        resolve({ estado: 0, message: "Inicio de sesion exitosa" });
                    } else {
                        reject({ estado: 2, message: "Error, contraseña invalida" });
                    }
                } else {
                    reject({ estado: 1, message: "Error, no existe el usuario" });
                }
            })
        }
    });
}

// Obtiene todos los datos del usuario de la tabla UsuarioNoValidado en base a un email especifico, si existe
// Devolvera todos los datos de ese usuario, si no existe lanzara un error
export const obtenerDatosPorEmail = async (Email: string) => {
    const queryCodigo = "SELECT * FROM UsuarioNoValidado WHERE Email = ?"

    return new Promise((resolve, reject) => {
        if (!Email) {
            reject("Email no encontrado");
        } else {
            database.query(queryCodigo, [Email], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results[0] == undefined){
                    reject("Error, email no encontrado");
                } else {
                    resolve(results[0]);
                }
            });
        }
    });
}

// Elimina un usuario de la tabla UsuarioNoValidado en base al Email
export const eliminarUsuarioPorEmail = async (Email: string) => {
    const deleteUsuarioNoValidado = "DELETE FROM UsuarioNoValidado WHERE Email = ?"

    return new Promise((resolve, reject) => {
        database.query(deleteUsuarioNoValidado, [Email], (err, _results) => {
            if (err) {
                reject(err);
            } else {
                resolve("Usuario eliminado");
            }
        });
    });
} 
