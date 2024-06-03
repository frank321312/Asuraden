import { ScriptProps } from "next/script";
import "./layoutAuth.css";

export default function LayoutAuth({ children }: ScriptProps) {
  return (
    <div className="h-screen flex">
      <div className="layout-auth h-full flex items-center justify-center">
        <header>
            <h1 className="bg-gradient-to-l to-slate-500 from-white bg-clip-text text-transparent text-6xl">Asuraden</h1>
            <p className="text-white">Un lugar donde puedes ser tu mismo XD</p>
        </header>
      </div>
      <div className="flex layout-form justify-center items-center flex-col">
        {children}
      </div>
    </div>
  );
}
