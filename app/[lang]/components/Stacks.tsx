'use client'
import { Chip } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Stacks = ({data}:{data:string[]}) => {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <ul className="flex flex-wrap justify-start">
                {data.map((stack, index) => (
                    <li key={index} >
                        <Chip variant="solid" color="warning" size="sm" className="ml-1">
                        {stack}
                        </Chip>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <ul className="flex flex-wrap justify-start">
            {data.map((stack, index) => (
                <li key={index} >
                    <Chip variant={`${theme=='dark'?'faded':"solid"}`} color="warning" size="sm" className="ml-1">
                    {stack}
                    </Chip>
                </li>
            ))}
        </ul>
    )
}

export default Stacks