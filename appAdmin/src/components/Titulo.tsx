'use client'
import Cookies from "js-cookie"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi"
import Image from 'next/image';

export function Titulo() {
  const [adminNome, setAdminNome] = useState<string>("")

  useEffect(() => {
    if (Cookies.get("admin_logado_nome")) {
      setAdminNome(Cookies.get("admin_logado_nome") as string)
    }
  }, [])

  return (
    <nav className="bg-blue-400 border-gray-200 dark:bg-customGray flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link href="/principal" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/teste.svg" className="h-16" alt="Abrigo" 
          width={240}
          height={120}/>
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            GestãoProPet - Administrativo
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold text-white">
        <FiUsers className="mr-2" />
        {adminNome}
      </div>
    </nav>
  )
}