import { Card, Row, Col, Typography, Avatar, Tooltip, Rate } from 'antd'
import { SettingOutlined, EditOutlined, EyeOutlined, GlobalOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import { capitalize } from 'lodash'
import { Link, useNavigate } from 'react-router-dom'

interface IProfileCardProps {
	account: Account
}

const ProfileCard = ({ account }: IProfileCardProps) => {
	const navigate = useNavigate()
	const actions = []
	const coverPhoto = account.images[0]?.url

	const locationsTitle = account.locations
		?.map((l) => {
			return `${l.city}, ${l.state}, ${l.zip}`
		})
		.join(' | ')

	const genresTitle = account.genre?.map(capitalize).join(', ')

	const genresTooltip = (
		<Tooltip title={genresTitle} trigger={['hover']}>
			<CustomerServiceOutlined />
		</Tooltip>
	)

	const locationsTooltip = (
		<Tooltip title={locationsTitle} trigger={['hover']}>
			<GlobalOutlined />
		</Tooltip>
	)

	locationsTitle && actions.push(locationsTooltip)
	genresTitle && actions.push(genresTooltip)

	const handleNavigate = (account: Account) => {
		navigate(`/dashboard/account/${account.account_id}`, { state: { account_id: account.account_id } })
	}

	return (
		<Card
			hoverable
			style={{ maxWidth: 400, flex: 'auto' }}
			cover={
				<div style={{ width: '100%', height: '200px' }}>
					<img
						alt="cover"
						src={account.images[0]?.url || `https://picsum.photos/400/600?random=${account.account_id}`}
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
				</div>
			}
			actions={actions}
			onClick={() => handleNavigate(account)}
		>
			<Card.Meta
				title={`${account.first_name} ${account.last_name}`}
				description={
					<div>
						<Typography.Title level={4} style={{ marginTop: 0 }}>
							{capitalize(account.vendor_type) || capitalize(account.client_type)}
						</Typography.Title>
						<Row align={'middle'}>
							<Rate disabled allowHalf value={account?.rating?.average_rating || 0} />({account.rating.total})
						</Row>
						<div style={{ paddingTop: 8 }}>{account.bio}</div>
					</div>
				}
			/>
		</Card>
	)
}

export default ProfileCard
