'use client'

import { Link } from "@heroui/react"
import { usePathname } from "next/navigation"
import { ReactElement } from "react"
import { pathWithoutLocale } from "@/lib/utils"

export default function LinkItem({label, href, icon, lang, props}: {label: string, href: string, icon?: ReactElement, lang: string, props?: any}) {
    const usePath = usePathname()
    const pathname = pathWithoutLocale(usePath)
    const path = `/${lang}${href}`
    return (
        <Link
            color={pathname ===href ? 'primary' : 'foreground'} 
            href={path} 
            underline="hover" 
            className={pathname === href ? "hidden": ''}
            {...props}>
            {icon ? <>{icon}<span className="ml-1">{label}</span></> : label}
        </Link>
    )
}