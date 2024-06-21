import { Outlet } from "react-router-dom"

import Header from "../components/Header"

export default function AppLayout() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
};