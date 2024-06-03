"use client";
import "./form.css";
import icoGoogle from "@/src/app/image/iconGoogle.png";
import Image from "next/image";
import Link from "next/link";
import "@/components/InputForm.css";
import "@/components/BotonAuth.css";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MessageErrorAxios {
  response: {
    data: {
      message: string;
      nombre: boolean;
      email: boolean;
      password: boolean;
      err: boolean;
    };
  };
}

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    nombreUser: false,
    emailUser: false,
    passwordUser: false,
    emailError: false,
  });
  console.log(usuario);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const enviarCodigo = async () => {
      try {
        await axios.post("http://localhost:8000/enviar-codigo", {
          Nombre: nombre,
          Email: email,
          Password: password,
        });
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const enviarDatos = await axios.post("http://localhost:8000/registro", {
        Nombre: nombre,
        Email: email,
        Password: password,
      });
      setUsuario({
        nombreUser: enviarDatos.data.nombre,
        emailUser: enviarDatos.data.email,
        passwordUser: enviarDatos.data.password,
        emailError: enviarDatos.data.err,
      });
      router.push("/autenticacion/validacion");
      await enviarCodigo();
    } catch (error) {
      const mensajeErr = error as MessageErrorAxios;
      const objectError = mensajeErr.response.data;
      setError(objectError.message);
      console.log(error);
      setUsuario({
        nombreUser: objectError.nombre,
        emailUser: objectError.email,
        passwordUser: objectError.password,
        emailError: objectError.err,
      });
    }
  }

  return (
    <form
      action=""
      className="w-full form flex-wrap form p-5"
      onSubmit={(e) => handleSubmit(e)}
    >
      <header>
        <h1 className="text-center text-4xl mb-12">Registrarse</h1>
      </header>

      <label htmlFor="" className="">
        Nombre de usuario:
      </label>
      <input
        type="text"
        style={{ backgroundColor: usuario.nombreUser ? "#e98787" : "" }}
        placeholder={usuario.nombreUser ? "" : "Usuario"}
        className="input-form"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <p
        style={{ marginTop: "-25px", marginBottom: "25px" }}
        className="text-red-700"
      >
        {usuario.nombreUser ? error : ""}
      </p>

      <label htmlFor="">Correo electrónico:</label>
      <input
        type="text"
        style={{ backgroundColor: usuario.emailUser || usuario.emailError ? "#e98787" : "" }}
        placeholder={usuario.emailUser ? "" : "Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-form"
      />
      <p
        style={{ marginTop: "-25px", marginBottom: "25px" }}
        className="text-red-700"
      >
        {usuario.emailUser || usuario.emailError ? error : ""}
      </p>

      <label htmlFor="">Contraseña:</label>
      <input
        type="password"
        style={{ backgroundColor: usuario.passwordUser ? "#e98787" : "" }}
        placeholder={usuario.passwordUser ? "" : "Contraseña"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-form"
      />
      <p
        style={{ marginTop: "-25px", marginBottom: usuario.passwordUser ? "25px" : "0" }}
        className="text-red-700"
      >
        {usuario.passwordUser ? error : ""}
      </p>

      <div
        className="w-full text-sm"
        style={{ marginTop: "-25px", marginBottom: "25px" }}
      >
        <Link
          href="http://localhost:3000/autenticacion/login"
          className="text-blue-500"
        >
          Iniciar sesion
        </Link>
      </div>

      <button className="boton-auth" type="submit">
        <p className="text-white">Crear cuenta</p>
      </button>

      <button
        className="flex justify-center w-full rounded-lg mt-6 bg-gris-google hover:bg-gray-400 transition-colors duration-300 ease-in-out"
        style={{ padding: "7px" }}
      >
        <Image src={icoGoogle.src} alt="google icon" width={25} height={25} />
        <p className="ml-2">Google</p>
      </button>
    </form>
  );
}
