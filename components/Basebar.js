"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';

const Basebar = () => {
    const pathname = usePathname();

  return (
    <>
      <div className="fixed sm:hidden flex bottom-0 z-10 w-full bg-white h-[70px] text-xs">
          <Link href={"/"} className={`flex flex-col w-full justify-center items-center gap-1 ${pathname === '/' ? "opacity-100" : "opacity-60"}`}>
            <Image width={20} height={20} src={`${pathname === '/' ? '/icons/new1.png' : '/icons/new0.png'}`} alt="" />
            New
          </Link>
          <Link href={"/popular"} className={`flex flex-col w-full justify-center items-center gap-1 ${pathname === '/popular' ? "opacity-100" : "opacity-60"}`}>
            <Image width={20} height={20} src={`${pathname === '/popular' ? '/icons/popular1.png' : '/icons/popular0.png'}`} alt="" />
            Popular
          </Link>
          <Link href={"/random"} className={`flex flex-col w-full justify-center items-center gap-1 ${pathname === '/random' ? "opacity-100" : "opacity-60"}`}>
            <Image width={20} height={20} src="/icons/random.png" alt="" />
            Random
          </Link>
          <Link href={"/collection"} className={`flex flex-col w-full justify-center items-center gap-1 ${pathname === '/collection' ? "opacity-100" : "opacity-60"}`}>
            <Image width={20} height={20} src={`${pathname === '/collection' ? '/icons/collection1.png' : '/icons/collection0.png'}`} alt="" />
            Collection
          </Link>
        </div>
    </>
  )
}

export default Basebar
