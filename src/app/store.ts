import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { authSlice } from '../features/auth/auth.slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { accountsSlice } from '../features/accounts/accounts.slice'
import { reviewsSlice } from '../features/reviews/reviews.slice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authSlice.reducer,
		accounts: accountsSlice.reducer,
		reviews: reviewsSlice.reducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
