import { useEffect } from 'react'
import { Form, Input, Typography, Button, Col, Row, FloatButton } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { useTypedSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { theme } from 'antd'

import { Widget } from '../components'
import { login } from '../../features/auth/auth.slice'
import flowers from '../../static/flowers.jpg'
import styles from './_login_screen.module.scss'

const { useToken } = theme

const LoginScreen = () => {
	const { authUser, status } = useTypedSelector((state) => state.auth)
	const dispatch = useAppDispatch()
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const { token } = useToken()

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
		<div className={styles.loginScreen} style={{ backgroundColor: token.colorSuccessBg }}>
			<div className={styles.main}>
				<Typography.Title>Bridal Beatz</Typography.Title>
				<Widget padding={'0'}>
					<div className={styles.formContainer}>
						<div className={styles.imgContainer}>
							<img src={flowers} alt="flowers" width={300} height={'100%'} />
						</div>
						<Col className={styles.loginForm}>
							<Row>
								<Typography.Title level={2}>Login</Typography.Title>
							</Row>
							<Form
								layout="vertical"
								form={form}
								onFinish={handleLogin}
								validateMessages={{ required: '${label} is required' }}
							>
								<Row>
									<Col span={24}>
										<Form.Item name={'email'} label="Email address" rules={[{ required: true }]}>
											<Input />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item name={'password'} label="Password" rules={[{ required: true }]}>
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
										<Button type="primary" color="danger" size="large" style={{ width: '100%' }} htmlType="submit" loading={status === 'pending'}>
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
						</Col>
					</div>
				</Widget>
			</div>
			<FloatButton
				type="primary"
				icon={<QuestionCircleOutlined />}
				tooltip={
					<Widget>
						<>Bridal Beatz is an online marketplace for wedding events, with a focus on live entertainment</>
					</Widget>
				}
			/>
		</div>
	)
}

export default LoginScreen
