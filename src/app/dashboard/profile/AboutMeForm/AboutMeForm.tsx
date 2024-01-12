import { Input, Typography, Form, Button, Row } from 'antd'
import { useAppDispatch } from '../../../hooks'

import { updateAccount } from '../../../../features/auth/auth.slice'
import { useState } from 'react'

const AboutMeForm = ({ account }) => {
	const [form] = Form.useForm()
	const [showSubmit, setShowSubmit] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	const handleSubmit = () => {
		const values = form.getFieldsValue()
		dispatch(updateAccount(values))
	}

	return (
		<>
			<Form form={form}>
				<Typography.Title level={3}>About me:</Typography.Title>
				<Form.Item name={'about_me'}>
					<Input.TextArea
						placeholder={account.about_me || 'Tell us a little about yourself'}
						onFocus={() => setShowSubmit(true)}
						onBlur={() => setShowSubmit(false)}
					></Input.TextArea>
				</Form.Item>
				<Row justify={'end'}>
					<Button htmlType="submit" type="primary" onClick={handleSubmit}>
						Update about me
					</Button>
				</Row>
			</Form>
		</>
	)
}

export default AboutMeForm
