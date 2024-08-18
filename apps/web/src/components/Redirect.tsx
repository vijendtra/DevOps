"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Redirect({ to }: { to: string }) {

    const router = useRouter()
    
    useEffect(() => {
        router.push(to)
    }
    , [])

    return null

}
