import Box from "@/components/ui/Box";
import { twMerge } from "tailwind-merge";

interface StatProps {
    icon: React.ReactNode;
    color: string;
    title: string;
    value: string;
    className?: string;
    extraInfo?: React.ReactNode;
}

const StatCard: React.FC<StatProps> = ({
    icon,
    color,
    title,
    value,
    className,
    extraInfo,
}) => {
    return (
        <Box className={twMerge(`bg-white border border-gray-200 rounded-lg w-full`, className)}>
            <div className="p-4 flex items-center">
                <div className={`p-3 rounded-full text-${color}-500 bg-${color}-100 mr-4`}>
                    {icon}
                </div>
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                        {title}
                    </p>
                    <p className="text-lg font-semibold text-gray-700 flex justify-between gap-2">
                        {value}
                        {extraInfo}
                    </p>
                </div>
            </div>
        </Box> 
    );
}

export default StatCard;
