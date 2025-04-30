import { useState } from "react";
import Sidebar from "../sidebar";
import { Topbar } from "../topbar";

export const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [closeSidebar, setCloseSidebar] = useState(false);

    return (
        <div className="bg-[#f8fafc]">
            <Topbar setCloseSidebar={() => setCloseSidebar(!closeSidebar)} />
            <div className="flex min-h-screen max-h-[93vh] overflow-hidden">
                <Sidebar close={closeSidebar} />
                <div className="p-6 w-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};
