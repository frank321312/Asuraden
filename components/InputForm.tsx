import { ScriptProps } from "next/script";
import "./InputForm.css";

type Input = {
    tipo: string,
    placeholder: string,
}

export default function InputForm({ tipo, placeholder }: Input) {
 return <input 
         type={tipo} 
         placeholder={placeholder} 
         className="input-form"
        />; 
}