
import { cookies } from 'next/headers'
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001/api/v1";

export async function getMiningHardwares() {

    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const res = await fetch(`${API_HOST}/mining-hardware`, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    })

    if (res.status === 401) {
        return {
            error: {
                message: 'Unauthorized'
            }
        }
    }

    return res.json()

}

export async function getAvailableAlgos() {

    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const res = await fetch(`${API_HOST}/general/available-algorithms`, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    })

    return res.json()
}
