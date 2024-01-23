import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { message } from 'antd'

import { api } from '../../utils/api'

export interface ReviewsState {
	reviews: Review[]
	status: 'idle' | 'pending' | 'failed' | 'fulfilled'
}

const initialState: ReviewsState = {
	reviews: [],
	status: 'idle',
}

export const createReview = createAsyncThunk<Review, any>('reviews/createReview', async (values, { getState }) => {
	const { account_id } = values
	delete values.account_id
	const { data } = await api.post(`/reviews/${account_id}`, values)
	return data.data
})

export const getReviews = createAsyncThunk<Review[], Account['account_id']>(
	'reviews/getReviews',
	async (id, { getState }) => {
		const { data } = await api.get(`/reviews/${id}`)
		return data.data
	}
)

export const reviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		resetReviews: () => initialState,
	},
	extraReducers: (builder) => {
		//Get Reviews for one account
		builder.addCase(getReviews.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(getReviews.fulfilled, (state, { payload }) => {
			state.reviews = [...payload]
			state.status = 'fulfilled'
		})
		builder.addCase(getReviews.rejected, (state) => {
			state.status = 'failed'
		})
		//create review
		builder.addCase(createReview.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(createReview.fulfilled, (state, { payload }) => {
			state.reviews = [...state.reviews, payload]
			state.status = 'fulfilled'
		})
		builder.addCase(createReview.rejected, (state) => {
			state.status = 'failed'
		})
	},
})
