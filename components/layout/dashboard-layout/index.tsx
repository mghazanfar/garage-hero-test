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
            <div className="flex min-h-screen">
                <Sidebar close={closeSidebar} />
                <div className="p-3 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
