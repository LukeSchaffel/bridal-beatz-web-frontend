import { Navigate, Outlet } from 'react-router-dom'
import { checkForUser } from '../../features/auth/auth.service'

const PrivateRoutes = () => {
	const isVerified = checkForUser()
	return isVerified ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoutes
