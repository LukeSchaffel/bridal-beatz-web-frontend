import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { message } from 'antd'

import { api } from '../../utils/api'

export interface AuthState {
	authUser: any //TODO change this
	account: any //TODO change this
	status: 'idle' | 'pending' | 'failed' | 'fulfilled'
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
	localStorage.setItem('access_token', data.token)
	return data.authUser
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

export const updateAccount = createAsyncThunk<AuthState['account'], any>(
	'auth/updateAccount',
	async (values, { getState }) => {
		const { account } = (getState() as RootState).auth ?? {}
		const { data } = await api.patch(`/auth/updateAccount/${account.account_id}`, values)
		return data.data
	}
)

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
			.addCase(signup.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(signup.fulfilled, (state, { payload }) => {
				state.authUser = payload
				state.account = payload.accounts[0]
				state.status = 'idle'
			})
			.addCase(signup.rejected, (state) => {
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
			.addCase(updateAccount.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(updateAccount.fulfilled, (state, { payload }) => {
				state.account = payload
				state.status = 'fulfilled'
			})
			.addCase(updateAccount.rejected, (state) => {
				state.status = 'failed'
			})
	},
})

export const { logout } = authSlice.actions
