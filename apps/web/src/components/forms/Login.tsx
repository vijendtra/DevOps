"use client"

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Image from "next/image";
import Link from "next/link";

import Button  from "@/components/ui/Button";
import Box from "@/components/ui/Box";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { setJwtToken } from "@/libs/auth";
import { useAuth } from "@/hooks/useAuth";

type Inputs = {
    email: string,
    password: string,
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001/api/v1";

const Login = () => {

    const auth = useAuth();
    const router = useRouter()
    if (auth) {
        router.push('/dashboard')
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
       fetch(`${API_HOST}/login`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {            
                    setJwtToken(data.token)
                    router.push('/dashboard')
                }
            }
        ).catch((error) => {
            console.error('Error:', error);
        });

    }

    return (
        <div className="items-center w-[500px] mt-10">
            <div className="flex justify-center mb-10">
                <Image src="/logo.png" width={400} height={400} alt="DMG Logo" />
            </div>
            <Box className="p-5">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
                  Sign in to your account
                </h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Enter your details below.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                    <Input type="text" className="my-3" placeholder="Email" {...register("email", { required: true })} />
                    <Input type="password" className="my-3" placeholder="Password" {...register("password", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                    <Button type="submit" className="mt-3">Continue</Button>
                </form>
                <div className="mt-5">
                    <p className="text-sm text-gray-600">
                        Don{`'`}t have an account? <Link href="/sign-up" className="text-dmg-light hover:text-dmg-dark">Sign Up</Link>
                    </p>
                </div>
            </Box>
        </div>
    );
}

export default Login;

