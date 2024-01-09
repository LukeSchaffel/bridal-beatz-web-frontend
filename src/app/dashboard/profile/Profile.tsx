import { Button, Card, Col, Descriptions, DescriptionsProps, Row, Typography } from 'antd'
import styles from './_profile.module.scss'
import { useTypedSelector } from '../../hooks'
import { theme } from 'antd'

import { capitalize } from 'lodash'
import { Widget } from '../../components'
import UpdateProfileForm from './UpdateProfileForm'
import { useState } from 'react'

const { Text } = Typography

const Profile = () => {
	const { account } = useTypedSelector((state) => state.auth)
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
						<span key={i}>
							{location.city} {location.state}
						</span>
					)) || '-'}
				</Text>
			),
		},
	]

	return (
		<div
			className={styles.page}
			// style={{ backgroundColor: token.colorSuccessBg }}
		>
			<UpdateProfileForm modal={modal} setModal={setModal} />
			<Row>
				<Typography.Title type="success">My Profile</Typography.Title>
			</Row>
			<Widget style={{ backgroundColor: 'transparent' }}>
				<>
					<Row style={{ width: '100%' }} wrap={false} gutter={[16, 0]}>
						<Col>
							<Card
								hoverable
								style={{ width: 240 }}
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
							>
								<Card.Meta title={`${account.first_name} ${account.last_name}`} description="www.instagram.com" />
							</Card>
						</Col>
						<Col flex={1}>
							<Descriptions items={items} bordered />
						</Col>
					</Row>
					<Row justify="end">
						<Button type="primary" onClick={() => setModal({})}>
							Update profile
						</Button>
					</Row>
				</>
			</Widget>
		</div>
	)
}

export default Profile
