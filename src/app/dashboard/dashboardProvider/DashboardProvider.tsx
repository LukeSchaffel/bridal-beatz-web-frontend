import { useEffect, createContext } from 'react'

import { logout, refreshUser } from '../../../features/auth/auth.slice'
import { useAppDispatch, useTypedSelector } from '../../hooks'
import { Button, Spin } from 'antd'
import styles from './_dashboard.module.scss'

interface InitialDashboardContextState {}

const dashboardContext = createContext<InitialDashboardContextState | null>({})

const DashboardProvider = () => {
	const dispatch = useAppDispatch()
	const { authUser } = useTypedSelector((state) => state.auth)

	const handleLogout = () => {
		dispatch(logout())
	}

	useEffect(() => {
		dispatch(refreshUser())
	}, [])

	if (!authUser)
		return (
			<div className={styles.spinContainer}>
				<Spin size="large" />
			</div>
		)

	return (
		<div className={styles.main}>
			<> hello {authUser.first_name}</>
			<Button onClick={handleLogout} type="link">
				Logout
			</Button>
		</div>
	)
}

export default DashboardProvider
