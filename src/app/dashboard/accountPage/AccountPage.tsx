import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button, Col, Row, Skeleton, Space, Spin, Typography, theme } from 'antd'
import {
	InfoCircleOutlined,
	EnvironmentOutlined,
	CustomerServiceOutlined,
	MailOutlined,
	UserOutlined,
	CaretLeftOutlined,
} from '@ant-design/icons'
import { capitalize } from 'lodash'
import { useAppDispatch, useTypedSelector } from '../../hooks'

import styles from './_account_page.module.scss'
import { Widget } from '../../components'
import ReviewForm from './reviewForm/ReviewForm'
import ReviewList from './reviewList/ReviewList'
import { getAccount } from '../../../features/accounts/accounts.slice'

const { Title, Paragraph } = Typography
const { useToken } = theme

const AccountPage = ({}) => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const {
		state: { account_id },
	} = location
	const { token } = useToken()
	const { accounts, selectedAccount, status } = useTypedSelector((state) => state.accounts)

	useEffect(() => {
		if (!account_id) {
			navigate('/dashboard')
		}
		dispatch(getAccount(account_id))
	}, [account_id, accounts])

	if (status === 'pending') {
		return (
			<div style={{ padding: '1rem' }}>
				<Skeleton.Avatar size={'large'} active />
				<Row>
					<Skeleton active />
				</Row>
			</div>
		)
	}

	const handleGoBack = () => {
		navigate('/dashboard')
	}

	const { email, first_name, last_name, genre, locations, bio, type, vendor_type, client_type, phone, about_me } =
		selectedAccount ?? {}

	return (
		<div className={styles.page}>
			<Button type="link" onClick={handleGoBack}>
				<Row align="middle">
					<CaretLeftOutlined /> {first_name} {last_name}
				</Row>
			</Button>
			<Row wrap gutter={[32, 16]}>
				<Col xs={24} sm={8}>
					<div>
						<img
							alt="cover"
							src={
								selectedAccount?.images[0]?.url ||
								'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
							}
							style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>
					</div>
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
						<CustomerServiceOutlined /> {genre?.map(capitalize).join(', ')}
					</Title>
				</Col>
				<Col xs={24} sm={8}>
					<Title level={3} style={{ marginTop: 0 }}>
						About me
					</Title>
					<Widget className={styles.aboutMeContainer}>
						<Paragraph>{about_me || 'Crickets...'}</Paragraph>
					</Widget>
				</Col>
				<Col xs={24} sm={8}>
					<div>
						<ReviewList account={selectedAccount} />
					</div>
					<ReviewForm account={selectedAccount} />
				</Col>
			</Row>
		</div>
	)
}

export default AccountPage
