import AddHardware from '@/components/forms/AddHardware';
import Redirect from '@/components/Redirect';
import DataTable from '@/components/core/DataTable';
import { getMiningHardwares } from '@/libs/actions';

const TABLE_HEAD = ["name", "location", "hashRate", "options"];

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001/api/v1";

export default async function DashboardPage() {

    const miningHardwares = await getMiningHardwares()
    if(miningHardwares.error) {
        return <Redirect to="/sign-in" />
    }

    return (
        <div className="min-h-screen">
            <DataTable
                data={miningHardwares.rows}
                columns={TABLE_HEAD.map((item) => ({
                    key: item,
                    label: item.toUpperCase(),
                }))}
                title="Mining Hardwares"
                paginationURL={`${API_HOST}/mining-hardware`}
                totalPages={miningHardwares.totalPages}
                showNewButton={true}
                form={<AddHardware />}
            />
        </div>
    );
}
