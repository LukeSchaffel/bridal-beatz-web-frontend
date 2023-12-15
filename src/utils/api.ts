import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message, Modal } from 'antd'

import { store } from '../app/store'

export const baseURL = process.env.REACT_APP_BASE_URL

export const api = axios.create({
	baseURL: `${baseURL}/api`,
})

api.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error)
		message.error(error?.response?.data?.message || error.message)
		throw error
	}
)
