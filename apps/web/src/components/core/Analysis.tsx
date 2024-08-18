"use client"

import { Bitcoin, DollarSign, HardHat, PercentSquare, ShieldEllipsis, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Hardware, AnalyzedHardwareData } from "@/libs/types";
import { useEffect, useState } from "react";
import StatCard from "@components/ui/StatCard";
import Button from "@components/ui/Button";

import Box from "@components/ui/Box";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const Analysis = () => {

    const auth = useAuth();
    
    const [hardwares, setHardwares] = useState<Hardware[]>([]);

    const [hardwarId, setHardwareId] = useState<number>(1);

    const [period, setPeriod] = useState<number>(10);

    const [analyzedData, setAnalyzedData] = useState<AnalyzedHardwareData>();

    function getAllHardwares() {
    
        if (!auth) return;
        fetch(`${API_HOST}/mining-hardware/all`, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setHardwares(data)
        })
        .catch(err => {
        })

    }

    function analyzeHardware(hardwareId: number, period: number) {
        if (!auth) return;
        fetch(`${API_HOST}/analysis?hardwareId=${hardwareId}&days=${period}`, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setAnalyzedData(data);
        })
        .catch(err => {
        })
    }

    useEffect(() => {
        analyzeHardware(hardwarId, period);
        getAllHardwares();
    }, [auth]);



    return (
        <div>
            <Box className="bg-white rounded-md border border-gray-100 overflow-y-hidden w-full">
                <div className="px-10 py-4 flex items-center justify-between gap-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 pt-5">
                        Analysis Module
                    </h3>
                   
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col items-center">
                            <label className="text-sm font-medium text-gray-700">Select Hardware</label>
                            <select 
                                onChange={(e) => setHardwareId(e.target.value as unknown as number)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
                                h-10
                                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                {hardwares && hardwares.map((hardware) => (
                                    <option key={hardware.id} value={hardware.id}>{hardware.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col items-center">
                            <label className="text-sm font-medium text-gray-700">Period</label>
                            <select 
                                onChange={(e) => setPeriod(parseInt(e.target.value))}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
                                h-10
                                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="7">7 Days</option>
                                <option value="10" selected>10 Days</option>
                                <option value="30">30 Days</option>
                            </select>
                        </div>

                        <div className="flex flex-col items-center pt-5">
                            <Button
                                onClick={() => analyzeHardware(hardwarId, period)}
                                className="text-white font-bold py-2 px-4 rounded-md w-auto">
                                Analyze
                            </Button>
                        </div>
                    </div>
                </div>

                {!analyzedData && (
                    <div className="flex flex-col items-center m-5 justify-center">
                        <p className="text-gray-300 text-2xl font-bold">No data to display</p>
                        <p className="text-gray-300 text-xl">Please select a hardware and a period to analyze</p>
                    </div>
                )}
                {analyzedData && (
                    <>
                        <div className="grid gap-6 mb-8 grid-cols-3 w-full px-10 pt-10">
                            <StatCard
                                icon={<Zap size={24} />}
                                color="teal"
                                title="Total Hashes"
                                value={`${analyzedData?.totalHashes.toFixed(2)} TH/s`}
                                className="shadow-lg"
                            />
                            <StatCard
                                icon={<Bitcoin size={24} />}
                                color="yellow"
                                title="Expected Bitcoins"
                                value={`${analyzedData.expectedBitcoins.toFixed(2)} BTC`}
                                className="shadow-lg"
                            />
                            <StatCard
                                icon={<PercentSquare size={24} />}
                                color="green"
                                title="Yield Percentage"
                                value={`${analyzedData.yieldPercentage.toFixed(2)} %`}
                                extraInfo={<small className="text-sm font-medium text-gray-500">If Actually Mined 1 BTC</small>}
                                className="shadow-lg"
                            />
                        </div>
                        <div className="flex flex-row justify-started gap-2 w-6/12 p-10">
                            <h2 className="text-lg font-bold text-gray-900">
                            Average hashrate for the selected hardware: {analyzedData.averageHashRate.toFixed(2)} TH/s
                            </h2>
                        </div>
                    </> 
                )}
            </Box>
        </div>
    )

}

export default Analysis;
