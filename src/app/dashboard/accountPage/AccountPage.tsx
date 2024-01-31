import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Anchor, Button, Col, Divider, Row, Skeleton, Typography, theme, Image } from 'antd'
import {
	EnvironmentOutlined,
	CustomerServiceOutlined,
	CaretLeftOutlined,
	MailOutlined,
	PhoneOutlined,
} from '@ant-design/icons'
import { capitalize } from 'lodash'
import { useAppDispatch, useTypedSelector } from '../../hooks'

import styles from './_account_page.module.scss'
import ReviewForm from './reviewForm/ReviewForm'
import ReviewList from './reviewList/ReviewList'
import { getAccount } from '../../../features/accounts/accounts.slice'

const { Title, Text, Paragraph } = Typography
const { useToken } = theme

const AccountPage = ({}) => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const account_id = parseInt(location.pathname.split('/')[3])
	const { accounts, selectedAccount, status } = useTypedSelector((state) => state.accounts)

	useEffect(() => {
		if (!account_id) {
			navigate('/dashboard')
		}
		dispatch(getAccount(account_id))
	}, [account_id, accounts])

	if (status === 'pending' || !selectedAccount) {
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

	const anchorItems = [
		{
			key: 'photos',
			href: '#photos',
			title: <span className={styles.navItem}>Photos</span>,
		},
		{
			key: 'about',
			href: '#about',
			title: <span className={styles.navItem}>About</span>,
		},
		{
			key: 'details',
			href: '#details',
			title: <span className={styles.navItem}>Details</span>,
		},
		{
			key: 'reviews',
			href: '#reviews',
			title: <span className={styles.navItem}>Reviews</span>,
		},
		{
			key: 'contact',
			href: '#contact',
			title: <span className={styles.navItem}>Contact</span>,
		},
	]

	return (
		<div className={styles.page}>
			<Button type="link" onClick={handleGoBack}>
				<Row align="middle">
					<CaretLeftOutlined /> {first_name} {last_name}
				</Row>
			</Button>
			<div id="photos" className={styles.photos}>
				<Image.PreviewGroup
					items={[
						...selectedAccount.images.map((i) => i.url),
						'https://picsum.photos/200/300',
						'https://picsum.photos/400/600',
						'https://picsum.photos/500/200',
					]}
				>
					<div className={styles.imgWrapper}>
						<Image
							height={'100%'}
							className={styles.img}
							alt="cover"
							src={
								selectedAccount?.images[0]?.url ||
								'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
							}
						/>
					</div>
					<div className={styles.imgWrapper}>
						<Image height={'100%'} className={styles.img} alt="cover" src={'https://picsum.photos/200/300'} />
					</div>
					<div className={styles.imgWrapper}>
						<Image height={'100%'} className={styles.img} alt="cover" src={'https://picsum.photos/400/600'} />
					</div>
					<div className={styles.imgWrapper}>
						<Image height={'100%'} className={styles.img} alt="cover" src={'https://picsum.photos/500/200'} />
					</div>
				</Image.PreviewGroup>
			</div>
			<div className={styles.main}>
				<Anchor style={{ backgroundColor: 'white' }} direction="horizontal" items={anchorItems} targetOffset={42} />
				<div>
					<Title level={2}>
						{first_name} {last_name}
					</Title>
				</div>
				<Divider />
				<div id="about">
					<Title level={4}>About this {type}</Title>
					<Title level={5}>{bio || 'No bio provided'}</Title>
					<Paragraph>{about_me}</Paragraph>
				</div>
				<Divider />
				<div id="details">
					<Title level={4}>Details</Title>
					<Row gutter={[16, 16]}>
						<Col>
							<Title level={5} style={{ marginTop: 0 }}>
								<EnvironmentOutlined /> Locations
							</Title>
							<Text>
								{locations
									?.map((l) => {
										return `${l.city}, ${l.state}, ${l.zip}`
									})
									.join(' | ') || 'No locations provided'}
							</Text>
						</Col>
						<Col>
							<Title level={5} style={{ marginTop: 0 }}>
								<CustomerServiceOutlined /> Genres
							</Title>
							<Text>{genre?.map(capitalize).join(', ')}</Text>
						</Col>
					</Row>
				</div>
				<Divider />
				<div id="reviews">
					<ReviewList account={selectedAccount} />
					<ReviewForm account={selectedAccount} />
				</div>
				<Divider />
				<div id="contact">
					<Title level={4}>Contact information</Title>
					<Text>
						<Row gutter={[16, 16]}>
							<Col>
								<Text underline>
									<MailOutlined /> {email}
								</Text>
							</Col>
							<Col hidden={!phone}>|</Col>
							<Col hidden={!phone}>
								<Text underline>
									<PhoneOutlined /> {phone}
								</Text>
							</Col>
						</Row>
					</Text>
				</div>
			</div>
		</div>
	)
}

export default AccountPage
