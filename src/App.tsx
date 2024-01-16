import React, { useEffect } from 'react'
import { ConfigProvider, ThemeConfig } from 'antd'

import { useAppDispatch } from './app/hooks'
import { useTypedSelector } from './app/hooks'
import AppRouter from './app/router/AppRouter'
import './App.css'
import { refreshUser } from './features/auth/auth.slice'
import { checkForUser } from './features/auth/auth.service'

function App() {
	const dispatch = useAppDispatch()
	const { authUser } = useTypedSelector((state) => state.auth)

	useEffect(() => {
		const isVerified = checkForUser()
		isVerified && dispatch(refreshUser())
	}, [])

	const token: ThemeConfig['token'] = {
		borderRadius: 9,
		colorWarning: '#e98417',
		colorError: '#e75557',
		colorSuccess: '#efd74a',
		colorPrimary: '#6972bc',
		colorInfo: '#6972bc',
	}

	return (
		<ConfigProvider
			theme={{
				token,
			}}
			getPopupContainer={(triggerNode) => triggerNode?.parentElement || document.body}
		>
			<div className="App">
				<AppRouter />
			</div>
		</ConfigProvider>
	)
}

export default App
