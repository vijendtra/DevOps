"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Gauge, PcCase, AreaChart } from 'lucide-react'
import LogoutBtn from './LogoutBtn'
import { usePathname } from 'next/navigation'

const Aside = () => {

    const path = usePathname()

    return (
        <aside className="absolute left-0 top-0 z-9999 flex h-screen w-[300px] flex-col overflow-y-hidden 
            bg-gradient-to-b from-dmg-light to-dmg-sidebar-bg
            duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0">
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 mt-5 lg:py-6.5 items-center">
                <Image src="/logo.png" alt="DMG Logo" width={300} height={300} className="bg-white p-5 rounded-lg"/>
            </div>
            <div className="flex flex-col h-screen justify-between">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-bold text-gray-300">General</h3>
                        <hr className="mb-2 border-blue-600" />
                        <ul className="mb-10 flex flex-col gap-5">
                            <li {...(path !== '/dashboard' ? 
                            { className: 'hover:bg-dmg-sidebar-item p-3 rounded-md transition duration-100 ease-linear' } :
                            { className: 'bg-dmg-sidebar-item border-l-2 border-sky-600 p-3 rounded-md' })}>
                                <Link href="/dashboard" className="text-white flex justify-start gap-2 font-[700]">
                                    <Gauge className="w-6 h-6" />
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                        <h3 className="mb-4 ml-4 text-sm font-bold text-gray-300">Management</h3>
                        <hr className="mb-2 border-blue-600" />
                        <ul className="mb-6 flex flex-col gap-5">
                            <li {...(path !== '/dashboard/mining-hardwares' ? 
                            { className: 'hover:bg-dmg-sidebar-item p-3 rounded-md transition duration-100 ease-linear' } :
                            { className: 'bg-dmg-sidebar-item border-l-2 border-sky-600 p-3 rounded-md' })}>
                                <Link href="/dashboard/mining-hardwares" className="text-white flex justify-start gap-2 font-[400]">
                                    <PcCase className="w-6 h-6" />
                                    Mining Hardware
                                </Link>
                            </li>
                            <li {...(path !== '/dashboard/analysis' ? 
                            { className: 'hover:bg-dmg-sidebar-item p-3 rounded-md transition duration-100 ease-linear' } :
                            { className: 'bg-dmg-sidebar-item border-l-2 border-sky-600 p-3 rounded-md' })}>
                                <Link href="/dashboard/analysis" className="text-white flex justify-start gap-2 font-[400]">
                                    <AreaChart className="w-6 h-6" />
                                    Analysis
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <LogoutBtn />
            </div>
        </aside>
    )
}

export default Aside
