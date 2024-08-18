import Stats from "@/components/dashboard/Stats";
import DataTable from "@/components/core/DataTable";
import { getAvailableAlgos, getMiningHardwares } from "@/libs/actions";
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { CalendarSearch, FunctionSquare } from "lucide-react";

const HARDWARE_TABLE_HEAD = ["name", "hashRate"];
const ALGO_TABLE_HEAD = ["title", "miningFactor", "maxSpeedLimit", "enabledMarkets"];

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001/api/v1";

async function getMiningStats() {

    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const res = await fetch(`${API_HOST}/mining-stats`, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    })

    return res.json()

}

export default async function DashboardPage() {

    const stats = await getMiningStats()

    const miningHardwares = await getMiningHardwares()

    const availableAlgos = await getAvailableAlgos()

    return (
        <div className="min-h-screen">
            <div className="flex flex-col items-center">
                <Stats 
                    miningStats={stats.miningStats} 
                    difficulty={stats.difficulty}
                    btcPrice={stats.btcPrice} />

            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center col-span-2">
                    <DataTable
                        data={availableAlgos.miningAlgorithms}
                        columns={ALGO_TABLE_HEAD.map((item) => {
                            // when reached Capital letter, add space before it for label but keep key as is
                            const label = item.replace(/([A-Z])/g, ' $1').trim()
                            return {
                                key: item,
                                label: label.toUpperCase(),
                            }
                        })}
                        title="Top Mining Algorithms"
                        icon={<FunctionSquare size={24} />}
                        color="gray"
                        />
                </div>
                <div className="flex flex-col items-center col-span-1">
                    <DataTable
                        data={miningHardwares.rows}
                        columns={HARDWARE_TABLE_HEAD.map((item) => ({
                            key: item,
                            label: item.toUpperCase(),
                        }))}
                        title="Recently Added Hardwares"
                        icon={<CalendarSearch size={24} />}
                        color="yellow"
                        />
                </div>
            </div>
        </div>
    );
}
