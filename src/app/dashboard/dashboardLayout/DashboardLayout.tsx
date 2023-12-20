import { Button, Layout, Spin } from 'antd'

import DashboardProvider from '../dashboardProvider/DashboardProvider'

const { Header, Sider, Content, Footer } = Layout

const DashboardLayout = () => {
	return (
		<Layout style={{ height: '100%' }}>
			<Header>header</Header>
			<Layout>
				<Sider>left sidebar</Sider>
				<Content>
					<DashboardProvider></DashboardProvider>
				</Content>
			</Layout>
			{/* <Footer>footer</Footer> */}
		</Layout>
	)
}

export default DashboardLayout
