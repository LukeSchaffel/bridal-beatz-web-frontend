import {  Navigate, Outlet } from 'react-router-dom'
import { useTypedSelector } from '../hooks'



const PrivateRoutes = () => {
	const { authUser } = useTypedSelector((state) => state.auth)
	
	return authUser ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoutes
