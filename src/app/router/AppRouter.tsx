import { Routes, Route, BrowserRouter } from "react-router-dom";

import DashboardLayout from "../dashboard/dashboardLayout/DashboardLayout";
import LoginScreen from "../loginScreen/LoginScreen";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" Component={DashboardLayout} />
        <Route path="/login" Component={LoginScreen} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
