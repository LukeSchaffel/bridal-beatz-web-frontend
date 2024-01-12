import { Button, Layout, Spin, theme } from 'antd'

import DashboardProvider from '../dashboardProvider/DashboardProvider'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import DashboardRouter from '../dashboardRouter/DashboardRouter'

const { Header, Sider, Content, Footer } = Layout
const { useToken } = theme

const DashboardLayout = () => {
	const { token } = useToken()

	const styles = { borderBottom: `1px solid ${token.colorBorder}`, backgroundColor: 'transparent' }

	return (
		<Layout style={{ height: '100%' }}>
			<Header style={styles}>
				<Navbar />
			</Header>
			<Content>
				<DashboardProvider />
			</Content>
		</Layout>
	)
}

export default DashboardLayout
