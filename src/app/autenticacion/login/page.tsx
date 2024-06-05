"use client";
import Link from "next/link";
import "../registro/form.css";
import "@/components/BotonAuth.css";
import "@/components/InputForm.css";
import icoGoogle from "@/src/app/image/iconGoogle.png";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MessageErrorAxios } from "../registro/page";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userEstado, setUserEstado] = useState(0);
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    emailUser: false,
    passwordUser: false,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const enviarDatos = await axios.post(
        "http://localhost:8000/iniciar-sesion",
        {
          Email: email,
          Password: password,
        }
      );
      setUserEstado(enviarDatos.data.mensaje.estado);
      router.push("/");
    } catch (error) {
      const mensajeErr = error as MessageErrorAxios;
      const objectError = mensajeErr.response.data;
      setError(objectError.message);
      console.log(objectError);
      setUsuario({
        emailUser: objectError.email,
        passwordUser: objectError.password,
      });
      if (objectError.mensaje) {
        setUserEstado(objectError.mensaje.estado);
        setError(objectError.mensaje.message);
      }
    }
  }

  return (
    <>
      <header>
        <h1 className="text-center text-4xl mb-4">Inicio de sesión</h1>
      </header>
      <form
        action=""
        className="w-full form flex-wrap form p-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="">Correo electrónico:</label>
        <input
          type="text"
          style={{
            backgroundColor: usuario.emailUser || userEstado == 1 ? "#e98787" : "",
          }}
          placeholder={usuario.emailUser || userEstado == 1 ? "" : "Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-form"
        />
        <p
          style={{ marginTop: "-25px", marginBottom: "25px" }}
          className="text-red-700"
        >
          {usuario.emailUser || userEstado == 1 ? error : ""}
        </p>

        <label htmlFor="">Contraseña:</label>
        <input
          type="password"
          style={{ backgroundColor: usuario.passwordUser || userEstado == 2 ? "#e98787" : "" }}
          placeholder={usuario.passwordUser || userEstado == 2 ? "" : "Contraseña"}  
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-form"
        />
        <p
          style={{
            marginTop: "-25px",
            marginBottom: usuario.passwordUser || userEstado == 2 ? "25px" : "0",
          }}
          className="text-red-700"
        >
          {usuario.passwordUser || userEstado == 2 ? error : ""}
        </p>

        <div
          className="w-full text-sm flex justify-between"
          style={{ marginTop: "-25px", marginBottom: "25px" }}
        >
          <Link href="#" className="text-blue-500">
            ¿Olvide mi contraseña?
          </Link>
          <Link
            href="http://localhost:3000/autenticacion/registro"
            className="text-blue-500"
          >
            Crear cuenta
          </Link>
        </div>

        <button className="boton-auth" type="submit">
          <p className="text-white">Iniciar sesion</p>
        </button>
        <button
          className="flex justify-center w-full rounded-lg mt-6 bg-gris-google hover:bg-gray-400 transition-colors duration-300 ease-in-out"
          style={{ padding: "7px" }}
        >
          <Image src={icoGoogle.src} alt="google icon" width={25} height={25} />
          <p className="ml-2">Google</p>
        </button>
      </form>
    </>
  );
}