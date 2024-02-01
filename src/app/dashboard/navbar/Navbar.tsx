import { useEffect, useState } from 'react'
import { Button, Menu, MenuProps, Modal, Row, theme, Typography, App } from 'antd'
import { HomeOutlined, MailOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useTypedSelector } from '../../hooks'
import { useAppDispatch } from '../../hooks'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from '../../../static/logo.jpeg'
import { logout } from '../../../features/auth/auth.slice'

const Navbar = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const { token } = theme.useToken()
	const { account, status } = useTypedSelector((state) => state.auth)
	const [current, setCurrent] = useState('home')
	const [{ confirm }, contextHolder] = Modal.useModal()
	const { type } = account ?? {}
	const onMyProfile = parseInt(location.pathname.split('/')[3]) === account?.account_id

	const items: MenuProps['items'] = [
		{
			label: 'Home',
			key: 'home',
			icon: <HomeOutlined style={{ fontSize: 20 }} />,
		},
		{
			label: 'My Profile',
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
		navigate(e.key)
	}

	useEffect(() => {
		if (onMyProfile) {
			setCurrent(`account/${account?.account_id}`)
		} else {
			setCurrent(location.pathname.split('/')[2])
		}
	}, [location.pathname])

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
