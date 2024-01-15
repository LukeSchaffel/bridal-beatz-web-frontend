import { Route, Routes } from 'react-router-dom'

import HomePage from '../homePage/HomePage'
import Profile from '../profile/Profile'

const DashboardRouter = () => {
	return (
		<Routes>
			{/* PUBLIC */}
			<Route index Component={HomePage} />
			<Route path={'/home'} Component={HomePage} />
			<Route path={'/profile'} Component={Profile} />
		</Routes>
	)
}

export default DashboardRouter
