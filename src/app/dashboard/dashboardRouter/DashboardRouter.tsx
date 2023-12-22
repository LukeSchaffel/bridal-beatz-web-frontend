import { Route, Routes } from "react-router-dom"

import HomePage from "../homePage/HomePage"

const DashboardRouter = () => {

	return (
		<Routes>
			{/* PUBLIC */}
			<Route path={'/home'} Component={HomePage} />
			<Route path={'/profile'} element={<>Profile</>} />

    
		</Routes>
	)
}

export default DashboardRouter
