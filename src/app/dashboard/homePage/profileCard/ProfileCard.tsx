import { Card, Row, Col, Typography, Avatar, Tooltip } from 'antd'
import { SettingOutlined, EditOutlined, EyeOutlined, GlobalOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import { capitalize } from 'lodash'

interface IProfileCardProps {
	account: Account
}

const ProfileCard = ({ account }: IProfileCardProps) => {
	const actions = [<EyeOutlined key="view" />]

	const locationsTitle = account.locations
		?.map((l) => {
			return `${l.city}, ${l.state}, ${l.zip}`
		})
		.join(' | ')

	const genresTitle = account.genre?.map(capitalize).join(', ')

	const genresTooltip = (
		<Tooltip title={genresTitle} trigger={['click']}>
			<CustomerServiceOutlined />
		</Tooltip>
	)

	const locationsTooltip = (
		<Tooltip title={locationsTitle} trigger={['click']}>
			<GlobalOutlined />
		</Tooltip>
	)

	locationsTitle && actions.push(locationsTooltip)
	genresTitle && actions.push(genresTooltip)

	return (
		<Card
			hoverable
			style={{ width: 300 }}
			cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
			actions={actions}
		>
			<Card.Meta
				avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
				title={`${account.first_name} ${account.last_name}`}
				description={
					<div>
						<Typography.Title level={5} style={{ margin: 0 }}>
							{capitalize(account.vendor_type) || capitalize(account.client_type)}
						</Typography.Title>
						{account.bio}
					</div>
				}
			/>
		</Card>
	)
}

export default ProfileCard
