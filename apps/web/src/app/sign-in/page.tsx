"use server"

import Login from "@/components/forms/Login";

export default async function SignInPage() {
    return (
        <div className="min-h-screen">
            <div className="flex flex-col items-center">
                <Login />
            </div>
        </div>
    );
}
