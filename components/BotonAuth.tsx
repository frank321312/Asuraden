import { ScriptProps } from "next/script";
import "./BotonAuth.css";

export default function ButtonAuth({ children }: ScriptProps) {
 return <button type="submit" className="boton-auth">{ children }</button>; 
}