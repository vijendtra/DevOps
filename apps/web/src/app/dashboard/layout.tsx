import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import '../styles/globals.css'

import { Gauge, PcCase, AreaChart, LogOut, User } from 'lucide-react'
import Aside from '@/components/dashboard/Aside'
import Header from '@/components/dashboard/Header'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700', '900']})

export const metadata: Metadata = {
    title: 'DMG - Dashboard',
    description: 'A web application that allows users to manage their mining facilities.',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <p className="hidden bg-teal-100 text-teal-500"></p>
            <p className="hidden bg-orange-100 text-orange-500"></p>
            <p className="hidden bg-green-100 text-green-500"></p>
            <p className="hidden bg-yellow-100 text-yellow-500"></p>
            <p className="hidden bg-sky-100 text-sky-500"></p>
            <Aside />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header />
                <section>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </section>
            </div>
        </div>
    );
}
