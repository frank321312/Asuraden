import Link from "next/link";
import "../registro/form.css";
import "@/components/BotonAuth.css";
import "@/components/InputForm.css";

export default function Login() {
  return (
    <>
      <header>
        <h1 className="text-center text-4xl mb-4">Inicio de sesión</h1>
      </header>
      <form action="" className="w-full form flex-wrap form p-5">
        <label htmlFor="">Correo electrónico:</label>
        <input type="text" placeholder="Email" className="input-form"/>

        <label htmlFor="">Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          className="input-form"
        />

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
      </form>
    </>
  );
}
