import { Routes, Route, BrowserRouter } from 'react-router-dom'

import DashboardLayout from '../dashboard/dashboardLayout/DashboardLayout'
import LoginScreen from '../loginScreen/LoginScreen'
import SignUpScreen from '../dashboard/signUpScreen/SignUpScreen'
import PrivateRoutes from './PrivateRoutes'

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* PUBLIC */}
				<Route path="/login" Component={LoginScreen} />
				<Route path="/signup" Component={SignUpScreen} />

				{/* PRIVATE (LOGGED IN) */}
				<Route element={<PrivateRoutes />}>
					<Route path="dashboard" element={<DashboardLayout />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
