import { useState } from 'react'
import { Button, Menu, MenuProps, Modal, Row, theme, Typography, App } from 'antd'
import { HomeOutlined, MailOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useTypedSelector } from '../../hooks'
import { useAppDispatch } from '../../hooks'
import { useNavigate } from 'react-router-dom'

import logo from '../../../static/logo.jpeg'

import { logout } from '../../../features/auth/auth.slice'
import styles from './_navbar.module.scss'
const { Item } = Menu
const { Title } = Typography

const Navbar = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { token } = theme.useToken()
	const { account } = useTypedSelector((state) => state.auth)
	const [current, setCurrent] = useState('home')
	const [{ confirm }, contextHolder] = Modal.useModal()

	const { type } = account ?? {}

	const items: MenuProps['items'] = [
		{
			label: 'Home',
			key: 'home',
			icon: <HomeOutlined style={{ fontSize: 20 }} />,
		},
		{
			label: 'My Profile',
			// key: 'profile',
			key: `account/${account?.account_id}`,
			icon: <UserOutlined style={{ fontSize: 20 }} />,
		},
	]

	const handleLogout = () => {
		confirm({
			title: 'Are you sure you want to logout?',
			onOk: () => {
				dispatch(logout())
			},
		})
	}

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key)
		navigate(e.key)
	}

	return (
		<Row align="middle">
			{contextHolder}
			<img src={logo} style={{ height: 50, width: 50, borderRadius: '50%' }} />
			<Menu
				style={{ fontSize: 20, backgroundColor: 'transparent', display: 'flex', flex: 1 }}
				onClick={onClick}
				selectedKeys={[current]}
				mode="horizontal"
				items={items}
			/>
			<Button
				danger
				type="link"
				style={{ fontSize: 20 }}
				icon={<LogoutOutlined style={{ fontSize: 20 }} />}
				onClick={handleLogout}
			>
				Logout
			</Button>
		</Row>
	)
}

export default Navbar
