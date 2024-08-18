import { jwtVerify } from "jose";
import Cookies from "universal-cookie";

export function getJwtSecretKey() {
    // TODO: move this to env as a private key
    const secret = 'secret'
    if (!secret) {
        throw new Error("JWT Secret key is not matched");
    }
    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        return payload;
    } catch (error) {
        return null;
    }
}

export async function setJwtToken(token: string) {
    const cookies = new Cookies();
    cookies.set("token", token, { path: "/" });
}
