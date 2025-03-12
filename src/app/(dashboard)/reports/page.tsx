import type { Metadata } from "next"
import { ReportsTab } from "@/components/reports-tab"

export const metadata: Metadata = {
    title: "Reports",
    description: "Generate and view reports for your inventory and sales",
}

export default function ReportsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            </div>

            <ReportsTab />
        </div>
    )
}

