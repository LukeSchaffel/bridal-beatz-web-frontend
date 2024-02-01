import { Button, Card, Col, Descriptions, DescriptionsProps, Input, Row, Typography } from 'antd'
import styles from './_profile.module.scss'
import { useAppDispatch, useTypedSelector } from '../../hooks'
import { theme } from 'antd'

import { capitalize } from 'lodash'
import { Widget, ImageUpload } from '../../components'
import UpdateProfileForm from './UpdateProfileForm'
import { useState } from 'react'
import { updateAccount } from '../../../features/auth/auth.slice'
import AboutMeForm from './AboutMeForm/AboutMeForm'

const { Text } = Typography

const Profile = () => {
	const dispatch = useAppDispatch()
	const { account, authUser } = useTypedSelector((state) => state.auth)
	const { token } = theme.useToken()
	const [modal, setModal] = useState<any | null>(null)

	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'First name',
			children: <Text>{account.first_name || '-'}</Text>,
		},
		{
			key: '2',
			label: 'Last name',
			children: <Text>{account.last_name || '-'}</Text>,
		},
		{
			key: '3',
			label: 'Email address',
			children: <Text>{account.email || '-'}</Text>,
		},
		{
			key: '4',
			label: 'Phone number',
			children: <Text>{account.phone || '-'}</Text>,
		},
		{
			key: '5',
			label: 'I am a:',
			children: <Text>{account.client_type || account.vendor_type || '-'}</Text>,
		},
		{
			key: '6',
			label: 'Interested in:',
			children: (
				<Text>{account?.genre?.map((genre: any, i: number) => <span key={i}>{capitalize(genre)} </span>) || '-'}</Text>
			),
		},
		{
			key: '7',
			label: 'Locations',
			children: (
				<Text>
					{account?.locations?.map((location: any, i: number) => (
						<span key={i} style={{ marginRight: '.5rem' }}>
							{location.city}, {location.state}
						</span>
					)) || '-'}
				</Text>
			),
		},
	]

	const handleChangeBio = (bio: string) => {
		dispatch(updateAccount({ bio }))
	}

	return (
		<div className={styles.page}>
			<UpdateProfileForm modal={modal} setModal={setModal} />
			<Row>
				<Typography.Title type="success">My Profile</Typography.Title>
			</Row>
			<Widget style={{ backgroundColor: 'transparent' }}>
				<>
					<Row style={{ width: '100%' }} gutter={[16, 0]}>
						{/* <Col>
							<Card hoverable style={{ width: 240 }} cover={<ImageUpload type="avatar" account={account} />}>
								<Card.Meta
									title={`${account.first_name} ${account.last_name}`}
									description={
										<div>
											<Typography.Text editable={{ onChange: (text) => handleChangeBio(text), maxLength: 160 }}>
												{account.bio || 'Add a bio'}
											</Typography.Text>
										</div>
									}
								/>
							</Card>
						</Col> */}
						<Col>
							<Typography.Title level={3} style={{ marginTop: 0 }}>
								Account details:
							</Typography.Title>
							<Descriptions items={items} bordered column={{ xs: 1, sm: 2, md: 2, lg: 2 }} />
							<br />
							<br />
							<Row justify="end">
								<Button type="primary" onClick={() => setModal({})}>
									Update profile
								</Button>
							</Row>
							<AboutMeForm account={account} />
						</Col>
					</Row>
					<br />
				</>
			</Widget>
		</div>
	)
}

export default Profile
