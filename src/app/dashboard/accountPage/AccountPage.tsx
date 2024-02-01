import { useEffect, useState } from 'react'
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
import UpdateProfileForm from '../profile/UpdateProfileForm'
import { updateAccount } from '../../../features/auth/auth.slice'
import AboutMeForm from '../profile/AboutMeForm/AboutMeForm'
import PhotoSection from './photoSection/PhotoSection'

const { Title, Text, Paragraph } = Typography
const { useToken } = theme

const AccountPage = ({}) => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const account_id = parseInt(location.pathname.split('/')[3])
	const { accounts, selectedAccount, status } = useTypedSelector((state) => state.accounts)
	const { authUser, account: myAccount } = useTypedSelector((state) => state.auth)
	const [modal, setModal] = useState(null)

	const isMyAccount = myAccount?.account_id === selectedAccount?.account_id

	useEffect(() => {
		if (!account_id) {
			navigate('/dashboard')
		}
		dispatch(getAccount(account_id))
	}, [account_id, accounts, myAccount])

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

	const handleChangeBio = (bio: string) => {
		dispatch(updateAccount({ bio }))
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
			<UpdateProfileForm modal={modal} setModal={setModal} />
			<Row align="middle" justify="space-between">
				<Col>
					<Button type="link" onClick={handleGoBack}>
						<CaretLeftOutlined /> {first_name} {last_name}
					</Button>
				</Col>
				{isMyAccount && (
					<Col>
						<Title style={{ margin: 0 }}>My Profile</Title>
					</Col>
				)}
			</Row>
			<div id="photos">
				<PhotoSection />
			</div>
			<div className={styles.main}>
				<Anchor style={{ backgroundColor: 'white' }} direction="horizontal" items={anchorItems} targetOffset={42} />
				<div>
					<Row justify="space-between" align="middle">
						<Col>
							<Title level={2}>
								{first_name} {last_name}
							</Title>
						</Col>
						{isMyAccount && (
							<Col>
								<Button type="primary" onClick={() => setModal({})}>
									Update profile
								</Button>
							</Col>
						)}
					</Row>
				</div>
				<Divider />
				<div id="about">
					{isMyAccount ? (
						<>
							<Title level={4}>About me</Title>
							<Title editable={{ onChange: (text) => handleChangeBio(text), maxLength: 160 }} level={5}>
								{bio || 'No bio provided'}
							</Title>
							<AboutMeForm account={myAccount} />
						</>
					) : (
						<>
							<Title level={4}>About this {type}</Title>
							<Title level={5}>{bio || 'No bio provided'}</Title>
							<Paragraph>{about_me}</Paragraph>
						</>
					)}
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
					{!isMyAccount && <ReviewForm account={selectedAccount} />}
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
