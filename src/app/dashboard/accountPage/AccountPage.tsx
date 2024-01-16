import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Col, Row, Space, Typography, theme } from 'antd'
import {
	InfoCircleOutlined,
	EnvironmentOutlined,
	CustomerServiceOutlined,
	MailOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { capitalize } from 'lodash'

import styles from './_account_page.module.scss'
import { Widget } from '../../components'

const { Title, Paragraph } = Typography
const { useToken } = theme

const AccountPage = ({}) => {
	const location = useLocation()
	const navigate = useNavigate()
	const { token } = useToken()
	const {
		state: { account },
	} = location

	useEffect(() => {
		if (!account) {
			navigate('/dashboard')
		}
	}, [])

	const {
		email,
		first_name,
		last_name,
		genre,
		locations,
		account_id,
		bio,
		type,
		vendor_type,
		client_type,
		phone,
		about_me,
	} = account as Account

	return (
		<div className={styles.page}>
			<Title type="success">
				{first_name} {last_name}
			</Title>
			<Row wrap>
				<Col xs={24} sm={12}>
					<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" style={{ width: 200, height: 200 }} />
					<Title level={4}>
						<UserOutlined /> {capitalize(client_type || vendor_type)}
					</Title>
					<Title level={4}>
						<InfoCircleOutlined /> {bio || 'No bio provided'}
					</Title>
					<Title level={4}>
						<MailOutlined /> {email}
					</Title>
					<Title level={4}>
						<EnvironmentOutlined />{' '}
						{locations
							?.map((l) => {
								return `${l.city}, ${l.state}, ${l.zip}`
							})
							.join(' | ') || 'No locations provided'}
					</Title>
					<Title level={4}>
						<CustomerServiceOutlined /> {genre.map(capitalize).join(', ')}
					</Title>
				</Col>
				<Col xs={24} sm={12}>
					<Title level={3} style={{ marginTop: 0 }}>
						About me
					</Title>
					<Widget className={styles.aboutMeContainer}>
						<Paragraph>{about_me || 'Crickets...'}</Paragraph>
					</Widget>
				</Col>
			</Row>
		</div>
	)
}

export default AccountPage
