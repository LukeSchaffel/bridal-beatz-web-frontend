import { Input, Typography, Form } from 'antd'
import { useAppDispatch } from '../../../hooks'

import { updateAccount } from '../../../../features/auth/auth.slice'

const AboutMeForm = ({ account }) => {
	const [form] = Form.useForm()

	return (
		<>
			<Form form={form}>
				<Form.Item name={'about_me'}>
					<Typography.Title level={3}>About me:</Typography.Title>
					<Input.TextArea placeholder={account.about_me || 'Tell us a little about yourself'}></Input.TextArea>
				</Form.Item>
			</Form>
		</>
	)
}

export default AboutMeForm
