"use client"

import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { LogOut } from 'lucide-react';

const LogoutBtn = () => {

    const cookies = new Cookies();
    const router = useRouter()
    function logOut() {
        cookies.remove('token') 
        router.push('/')
    }

    return (
        <div className="flex flex-col justify-start gap-2 px-6 py-5.5 mt-5 lg:py-6.5 p-5 bg-dmg-sidebar-bg">
            <button className="text-white flex justify-start gap-2 font-[400]" onClick={logOut}>
                <LogOut className="w-6 h-6" />
                Log out
            </button>

        </div>
    )

}

export default LogoutBtn
