"use client";
import Link from "next/link";
import "../registro/form.css";
import "@/components/BotonAuth.css";
import "@/components/InputForm.css";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MessageErrorAxios } from "../registro/page";

export default function ValidarCodigo() {
  const [codigo, setCodigo] = useState("");
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleCodigo(e: string) {
    if (e.indexOf(" ") > 0 || isNaN(Number(e)) || e[0] == " ") {
      setError(true);
      setMessageError("Solo puede ingresar numeros");
    } else {
      setError(false);
      setCodigo(e);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const enviarDatos = await axios.post(
        "http://localhost:8000/validar-registro",
        {
          Email: localStorage.getItem("correo"),
          Codigo: codigo
        }
      );
      setError(false);
      localStorage.setItem("Id", enviarDatos.data.id)
      router.push("/");
    } catch (error) {
      const mensajeErr = error as MessageErrorAxios;
      const objectError = mensajeErr.response.data;
      setError(true);
      setMessageError(objectError.message);
    }
  }

  return (
    <>
      <header>
        <h1 className="text-center text-4xl mb-4">Validación</h1>
      </header>
      <form action="" className="w-full form flex-wrap form p-5" onSubmit={e => handleSubmit(e)}>
        <p className="mb-2">
          Se ha enviado un codigo de verificacion a <span style={{color: "rgb(35, 95, 226)"}}>{ localStorage.getItem("correo") }</span>
        </p>
        <label htmlFor="">Ingrese el codigo:</label>
        <input
          type="text"
          placeholder={error ? "" : "Codigo"}
          className="input-form"
          style={{ backgroundColor: error ? "#e98787" : "" }}
          value={codigo}
          onChange={(e) => handleCodigo(e.target.value)}
        />
        <p
          style={{
            marginTop: "-25px",
            marginBottom:
              error ? "25px" : "0",
          }}
          className="text-red-700"
        >
          { error ? messageError : ""}
        </p>

        <div
          className="w-full text-sm flex justify-between"
          style={{ marginTop: "-25px", marginBottom: "25px" }}
        >
          <Link href="#" className="text-blue-500">
            ¿Volver a enviar codigo?
          </Link>
        </div>

        <button className="boton-auth" type="submit">
          <p className="text-white">Enviar codigo</p>
        </button>
      </form>
    </>
  );
}
