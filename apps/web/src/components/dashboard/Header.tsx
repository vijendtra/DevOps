"use client";

import Link from 'next/link'
import { UserCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

const Header = () => {

    const auth = useAuth()
    const [name, setName] = useState('')

    useEffect(() => {
        if (auth) {
            setName(auth?.name as unknown as string)
        }
    }, [auth])

    return (
        <header className="top-0 z-999 flex w-full bg-white shadow-dmg p-4">
            <div className="flex flex-row justify-between w-full px-6 py-5.5 lg:py-6.5 items-center">
                <div className="flex gap-2">
                    <h1 className="text-md font-[400] text-dmg-light">Mining Facility Management System</h1>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard/profile" className="flex justify-start gap-2 font-[400] text-white bg-dmg-light p-3 rounded-lg hover:bg-dmg-dark transition">
                        <span className="text-md font-[400]">Hello, {name}</span>
                        <UserCircle2 className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
