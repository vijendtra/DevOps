"use client" ;
import React, { useState } from "react";
import Cookies from "universal-cookie";

import { verifyJwtToken } from "@/libs/auth";
import type { JWTPayload } from "jose";

export function useAuth() {
  const [auth, setAuth] = useState<JWTPayload | null>(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    const verifiedToken = await verifyJwtToken(token);

    const auth = verifiedToken ? { ...verifiedToken, token } : null;

    setAuth(auth);
  };
  React.useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}
