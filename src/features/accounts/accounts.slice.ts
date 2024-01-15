import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { message } from 'antd'

import { api } from '../../utils/api'

export interface AccountsState {
	accounts: Account[]
	status: 'idle' | 'pending' | 'failed' | 'fulfilled'
}

const initialState: AccountsState = {
	accounts: [],
	status: 'idle',
}

export const getAccounts = createAsyncThunk<AccountsState['accounts'], string>(
	'accounts/getAccounts',
	async (query, { getState }) => {
		const { data } = await api.get(`/accounts?${query}`)

		return data.data
	}
)

export const accountsSlice = createSlice({
	name: 'accounts',
	initialState,
	reducers: {
		resetAccounts: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getAccounts.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
			state.accounts = payload
			state.status = 'fulfilled'
		})
		builder.addCase(getAccounts.rejected, (state) => {
			state.status = 'failed'
		})
	},
})
