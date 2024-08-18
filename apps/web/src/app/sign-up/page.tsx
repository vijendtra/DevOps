"use client";

import Register from "@/components/forms/Register";
import { useEffect, useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function RegisterPage() {
    return (
        <div className="min-h-screen">
            <div className="flex flex-col items-center">
                <Register />
            </div>
        </div>
    );
}
