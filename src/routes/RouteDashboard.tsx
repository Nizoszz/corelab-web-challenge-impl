import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

export const RouteDashboard = () => {
    return (
        <Routes>
            <Route index element={<Dashboard/>}/>
        </Routes>
    );
};