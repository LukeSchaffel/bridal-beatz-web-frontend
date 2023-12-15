import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { authSlice } from '../features/auth/auth.slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authSlice.reducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
