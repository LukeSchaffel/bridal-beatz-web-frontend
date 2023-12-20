import { Form, Input, Typography, Button, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { useTypedSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'

import { login } from '../../features/auth/auth.slice'
import './_login_screen.css'
import { useEffect } from 'react'

const LoginScreen = () => {
	const { authUser } = useTypedSelector((state) => state.auth)
	const dispatch = useAppDispatch()
	const [form] = Form.useForm()
	const navigate = useNavigate()

	const handleLogin = async (values: any) => {
		await dispatch(login(values))
		navigate('/dashboard')
	}

	useEffect(() => {
		if (authUser) {
			navigate('/dashboard')
		}
	}, [authUser])

	return (
		<div className="login-screen">
			<Typography.Title>Welcome to my app</Typography.Title>
			<div>
				<Form layout="vertical" className="login-form" form={form} onFinish={handleLogin}>
					<Row>
						<Col span={24}>
							<Form.Item name={'email'} label="Email address">
								<Input />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'password'} label="Password">
								<Input.Password />
							</Form.Item>
						</Col>
					</Row>
					<Col>
						<Row align="middle" justify="end">
							<Button type="link" danger>
								Forgot password
							</Button>
						</Row>
						<Row align="middle" justify="center">
							<Button type="primary" color="danger" size="large" style={{ width: '100%' }} htmlType="submit">
								Login
							</Button>
						</Row>
						<Row justify="center" align="middle">
							<Typography.Text>Don't have an account?</Typography.Text>{' '}
							<Button type="link">
								<Link to={'/signup'}>Create one now</Link>
							</Button>
						</Row>
					</Col>
				</Form>
			</div>
		</div>
	)
}

export default LoginScreen
