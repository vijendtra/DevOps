"use client";

import { useEffect, useState } from "react";
import Login  from "@/components/forms/Login";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <div className="flex flex-col items-center">
                <Login />
            </div>
        </div>
    );
}
