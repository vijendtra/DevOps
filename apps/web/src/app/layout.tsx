
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './styles/globals.css'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700', '900']})

export const metadata: Metadata = {
    title: 'DMG Mining Facility Management System',
    description: 'A web application that allows users to manage their mining facilities.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={lato.className}>
                <main className="flex flex-col w-full items-center">
                    <section className="flex flex-col w-full">
                        {children}
                    </section>
                </main>
            </body>
        </html>
    );
}
