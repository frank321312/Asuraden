"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Autenticacion() {
  const router = useRouter();
  useEffect(() => {
    router.push("http://localhost:3000/autenticacion/registro");
  });
}
