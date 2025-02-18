"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
    const pathName = usePathname();
    return (
        <header className="my-10 flex justify-between gap-5">
            <Link href="/" className="flex gap-2  ">
                <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
                <h1>Library Management</h1>
            </Link>

            <ul className="flex gap-2">
                <li>
                    <Link href="/library" className={`${pathName === "/library" ? "text-light-200" : "text-light-100"}`}>
                        Library
                    </Link>
                </li>
                <li>
                    <Link href="/borrowed" className={`${pathName === "/borrowed" ?  "text-light-200" : "text-light-100"}`}>
                        Borrowed
                    </Link>
                </li>
            </ul>

        </header>
    )
}

export default Header