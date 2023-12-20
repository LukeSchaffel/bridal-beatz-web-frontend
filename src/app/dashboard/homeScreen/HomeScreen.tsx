import { Button } from 'antd'
import { api } from '../../../utils/api'

const HomeScreen = () => {
	const handleRefresh = () => {
		api.post('/auth/refreshUser')
	}
	return (
		<>
			This is the homescreen
			<Button onClick={handleRefresh}>Refresh user</Button>
		</>
	)
}

export default HomeScreen
