import React, { useEffect } from 'react'

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

	return (
		<div className="App">
			<AppRouter />
		</div>
	)
}

export default App
