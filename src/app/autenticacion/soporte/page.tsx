import Link from "next/link";
import "../registro/form.css";
import "@/components/BotonAuth.css";
import "@/components/InputForm.css";


export default function Soporte() {
  return (
    <>
      <header>
        <h1 className="text-center text-4xl mb-4">Recuperar cuenta</h1>
      </header>
      <form action="" className="w-full form flex-wrap form p-5">
        <label htmlFor="">Ingrese el codigo:</label>
        <input type="text" placeholder="Codigo" className="input-form"/>

        <div
          className="w-full text-sm flex justify-between"
          style={{ marginTop: "-25px", marginBottom: "25px" }}
        >
          <Link href="#" className="text-blue-500">
            ¿Volver a enviar codigo?
          </Link>
          <Link href="#" className="text-blue-500">
            Soporte
          </Link>
        </div>

        <button className="boton-auth" type="submit">
          <p className="text-white">Enviar codigo</p>
        </button>
      </form>
    </>
  );
}
