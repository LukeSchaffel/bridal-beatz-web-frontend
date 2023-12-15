import { Form, Input, Typography, Button, Col, Row, Select } from 'antd'
import { Link } from 'react-router-dom'
import './_signup_screen.scss'
import { signup } from '../../../features/auth/auth.slice'
import { useAppDispatch } from '../../hooks'

const SignUpScreen = () => {
	const dispatch = useAppDispatch()
	const [form] = Form.useForm()

	const handleSubmit = (values: any) => {
		dispatch(signup(values))
	}

	return (
		<div className="signup-screen">
			<Typography.Title>Create an account</Typography.Title>
			<div>
				<Form
					layout="vertical"
					className="signup-form"
					form={form}
					validateMessages={{ required: '${label} is required' }}
					onFinish={handleSubmit}
				>
					<Row>
						<Col span={24}>
							<Form.Item name="email" label="Email address" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name="first_name" label="First name" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name="last_name" label="Last name" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										min: 8,
									},
									{ required: true },
								]}
							>
								<Input.Password />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="password2"
								label="Confirm password"
								rules={[
									{
										min: 8,
										message: 'Password must be at least 8 characters',
									},
									{
										required: true,
										message: 'Please confirm your password!',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve()
											}
											return Promise.reject(new Error('The new password that you entered do not match!'))
										},
									}),
								]}
							>
								<Input.Password />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'type'} label={'I am a:'}>
								<Select
									options={[
										{
											label: 'Client',
											value: 'client',
										},
										{
											label: 'Vendor',
											value: 'vendor',
										},
									]}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Col>
						<Row align="middle" justify="center">
							<Button type="primary" color="danger" size="large" style={{ width: '100%' }} htmlType="submit">
								Create account
							</Button>
						</Row>
					</Col>
				</Form>
			</div>
		</div>
	)
}

export default SignUpScreen
