import { Routes, Route, BrowserRouter } from "react-router-dom";

import DashboardLayout from "../dashboard/dashboardLayout/DashboardLayout";
import LoginScreen from "../loginScreen/LoginScreen";
import SignUpScreen from "../dashboard/signUpScreen/SignUpScreen";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" Component={DashboardLayout} />
        <Route path="/login" Component={LoginScreen} />
        <Route path="/signup" Component={SignUpScreen} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
