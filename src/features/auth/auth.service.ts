import { JwtPayload, jwtDecode } from 'jwt-decode'

export const checkForUser = () => {
	const token = localStorage.getItem('access_token')
	if (token) {
		const { exp } = jwtDecode(token) as { authUser?: any; exp: number }
		if (Date.now() <= exp * 1000) {
			return true
		}
	}
	return false
}
