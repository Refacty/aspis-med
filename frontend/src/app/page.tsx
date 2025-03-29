"use client"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push('/inicio')
    }, []);

  return (
    <>
        <p>Carregando...</p>
    </>
  );
}
