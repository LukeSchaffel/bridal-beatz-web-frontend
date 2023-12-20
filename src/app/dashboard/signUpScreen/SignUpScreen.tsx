import { useEffect } from 'react'
import { Form, Input, Typography, Button, Col, Row, Select, Radio } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { theme } from 'antd'

import { signup } from '../../../features/auth/auth.slice'
import { useAppDispatch, useTypedSelector } from '../../hooks'
import { Widget } from '../../components'
import styles from './_signup_screen.module.scss'
const { useToken } = theme

const SignUpScreen = () => {
	const dispatch = useAppDispatch()
	const [form] = Form.useForm()
	const { authUser } = useTypedSelector((state) => state.auth)
	const navigate = useNavigate()
	const { token } = useToken()
	const type = Form.useWatch('type', form)

	const handleSubmit = (values: any) => {
		dispatch(signup(values))
	}

	useEffect(() => {
		if (authUser) {
			navigate('/dashboard')
		}
	}, [authUser])

	return (
		<div className={styles.signupScreen} style={{ backgroundColor: token.colorSuccessBg }}>
			<div className={styles.main}>
				<Typography.Title>Create an account</Typography.Title>
				<Widget>
					<>
						<div className={styles.signupForm}>
							<Form
								layout="vertical"
								form={form}
								validateMessages={{ required: '${label} is required' }}
								onFinish={handleSubmit}
							>
								<Row>
									<Col span={24}>
										<Typography.Title level={5}>I am a:</Typography.Title>
										<Form.Item name={'type'}>
											<Radio.Group buttonStyle="solid">
												<Radio.Button value="client">Bride / Groom / Wedding Planner</Radio.Button>
												<Radio.Button value="vendor">Band / DJ / Vendor</Radio.Button>
											</Radio.Group>
										</Form.Item>
										<Typography.Title level={5}>
											Looking for : {type === 'client' ? 'Entertainment' : 'Events'}
										</Typography.Title>
									</Col>

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
					</>
				</Widget>
				<Button type="link">
					<Link to={'/login'}>Back to login</Link>
				</Button>
			</div>
		</div>
	)
}

export default SignUpScreen
