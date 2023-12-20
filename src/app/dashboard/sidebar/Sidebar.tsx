import { Menu, theme, Typography } from 'antd'

const { Item } = Menu
const { Title } = Typography

const Sidebar = () => {
	const { token } = theme.useToken()

	return (
		<>
			<Menu style={{ backgroundColor: token.colorPrimary }}>
				<Item>
					<Title level={5}>Option 1</Title>
				</Item>
				<Item>Option 2</Item>
				<Item>Option 3</Item>
				<Item>Option 4</Item>
			</Menu>
		</>
	)
}

export default Sidebar
