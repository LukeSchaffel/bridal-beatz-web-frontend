import { useState } from 'react'
import { Menu, MenuProps, theme, Typography } from 'antd'
import { HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { useTypedSelector } from '../../hooks'

import styles from './_navbar.module.scss'
const { Item } = Menu
const { Title } = Typography

const Navbar = () => {
	const { token } = theme.useToken()
	const { account } = useTypedSelector((state) => state.auth)
	const [current, setCurrent] = useState('home')

	const items: MenuProps['items'] = [
		{
			label: 'Home',
			key: 'home',
			icon: <HomeOutlined style={{ fontSize: 20 }} />,
		},
	]

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key)
	}

	return (
		<>
			<Menu style={{ fontSize: 20 }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
		</>
	)
}

export default Navbar
