"use client";

import Box from "@/components/ui/Box";
import { Bitcoin, DollarSign, HardHat, ShieldEllipsis, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "@components/ui/StatCard";

interface StatsProps {
    miningStats: {
        totalHashrate: number,
        activeMiners: number,
        miningRevenue: number,
    },
    btcPrice: number,
    difficulty: number,
}

const Stats: React.FC<StatsProps> = ({ miningStats, btcPrice, difficulty }) => {

    const formattedDiff = difficulty / 1e12;
    return (
        <div className="grid gap-6 mb-8 grid-cols-3 w-full">
            <StatCard
                icon={<Zap size={24} />}
                color="teal"
                title="Total Hashrate"
                value={`${miningStats.totalHashrate.toFixed(2)} TH/s`}
            />
            <StatCard
                icon={<HardHat size={24} />}
                color="orange"
                title="Active Miners"
                value={miningStats.activeMiners + ""}
            />
            <StatCard
                icon={<DollarSign size={24} />}
                color="green"
                title="Mining Revenue"
                value={new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(miningStats.miningRevenue)}
            />
            <StatCard
                icon={<Bitcoin size={24} />}
                color="yellow"
                title="Bitcoin Price"
                value={new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(btcPrice)}
                className="col-span-2"
            />
            <StatCard
                icon={<ShieldEllipsis size={24} />}
                color="sky"
                title="Difficulty"
                value={formattedDiff.toFixed(2) + " T"}
            />
        </div>
    );
}

export default Stats;
