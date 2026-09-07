'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export const Buymeacoffee = ({label}:any) => {
    const { theme } = useTheme()

    const qr = `/images/buymeacoffee_QR.png`;
    const svg = `/images/buymeacoffee.svg`;

    return (
        <Link
            href="https://buymeacoffee.com/alvaldes"
            aria-label="Buy me a coffee"
            target='_blank'
            className="relative flex w-fit sm:mr-4 group rounded-lg overflow-hidden"
        >
            <Image
            src={qr}
            alt="Buy me a coffee QR code"
            width={112}
            height={112}
            loading="lazy"
            className="w-28 h-28 opacity-100 transition duration-200 group-hover:opacity-0"
            />
            <Image
            src={svg}
            alt="Buy me a coffee"
            width={112}
            height={112}
            loading="lazy"
            className="w-28 h-28 opacity-0 transition duration-500 group-hover:opacity-100 absolute brightness-95 dark:brightness-100"
            />
        </Link>
    )
}