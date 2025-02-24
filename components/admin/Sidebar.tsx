"use client"
import { adminSideBarLinks } from "@/app/constants"
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ session }: { session: Session }) => {
    const pathName = usePathname();
    return (
        <div className="admin-sidebar">
            <div>
                <div className="logo">
                    <Image src="/icons/admin/logo.svg"
                        height={37}
                        width={37}
                        alt="logo"
                    />
                </div>
                <h1>Library Manager</h1>
                <div className="mt-10 flex flex-col gap-5">
                    {adminSideBarLinks.map((link) => {
                        const isSelected = (link.route !== '/admin' && pathName.includes(link.route)
                            && link.route.length > 1) || pathName === link.route;
                        return (
                            <Link key={link.route} href={link.route}>
                                <div className={cn("link", isSelected && "bg-primary-admin shadow-sm")}>
                                    <div className="relative size-5">
                                        <Image src={link.img} alt="icon"
                                            fill
                                            className={`${isSelected ? 'brightness-0 invert' : ''} 
                                                    object-contain`} />
                                    </div>
                                    <p className={cn(isSelected ? "text-white" : "text-dark")}>{link.text}</p>
                                </div>
                            </Link>
                        )
                    })}
                    <div className="user">
                        <Avatar>
                            <AvatarFallback className="bg-amber-100">
                                {getInitials(session?.user?.name || "IN")}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col max-md:hidden">
                            <p className="font-semibold text-dark-200">{session?.user?.name}</p>
                            <p className="font-semibold text-dark-200">{session?.user?.email}</p>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar