import { Route, Routes } from 'react-router-dom'

import HomePage from '../homePage/HomePage'
import Profile from '../profile/Profile'
import AccountPage from '../accountPage/AccountPage'

const DashboardRouter = () => {
	return (
		<Routes>
			{/* PUBLIC */}
			<Route path={'/home'} Component={HomePage} />
			<Route path={'/profile'} Component={Profile} />
			<Route path={'/account/:account_id'} Component={AccountPage} />
			<Route index Component={HomePage} />
		</Routes>
	)
}

export default DashboardRouter
