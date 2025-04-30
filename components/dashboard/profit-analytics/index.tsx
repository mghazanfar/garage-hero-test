import { MonthlyTarget } from "./monthly-target-pie-chart";
import { PayablesReceivablesChart } from "./payables-receivables-bar-chart";
import ProfitChart from "./profit-bar-chart";

export function ProfitAnalysis() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <ProfitChart />
            </div>
            <div className="flex flex-col gap-4 max-w-[550px]">
                <MonthlyTarget />
                <PayablesReceivablesChart />
            </div>
        </div>
    )
}