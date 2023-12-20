import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { message } from 'antd'

import { api } from '../../utils/api'

export interface AuthState {
	authUser: any //TODO change this
	account: any //TODO change this
	status: 'idle' | 'pending' | 'failed'
}

const initialState: AuthState = {
	authUser: null,
	account: null,
	status: 'idle',
}

export const signup = createAsyncThunk('auth/signup', async (values: any) => {
	values = {
		...values,
		email: values.email.toLowerCase(),
	}
	const { data } = await api.post('/auth/signup', values)
})

export const login = createAsyncThunk<any, any>('auth/login', async (values) => {
	const email = values.email.toLowerCase()
	const password = values.password

	const { data } = await api.post('/auth/login', { email, password })

	localStorage.setItem('access_token', data.token)
	return data.authUser
})

export const refreshUser = createAsyncThunk<any>('auth/refreshUser', async () => {
	const { data } = await api.post('/auth/refreshUser')
	return data.authUser
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetAuthState: () => initialState,
		logout: (state) => {
			localStorage.clear()
			sessionStorage.clear()
			state.authUser = null
			state.account = null
			state.status = 'idle'
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.authUser = payload
				state.account = payload.accounts[0]
				state.status = 'idle'
			})
			.addCase(login.rejected, (state) => {
				state.status = 'failed'
			})

			.addCase(refreshUser.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(refreshUser.fulfilled, (state, { payload }) => {
				state.authUser = payload
				state.account = payload.accounts[0]
				state.status = 'idle'
			})
			.addCase(refreshUser.rejected, (state) => {
				state.status = 'failed'
			})
	},
})

export const { logout } = authSlice.actions
