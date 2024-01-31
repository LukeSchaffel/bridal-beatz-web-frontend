import { Row, Col, Form, Rate, Input, Typography, Button, message } from 'antd'

import { useAppDispatch, useTypedSelector } from '../../../hooks'
import { createReview } from '../../../../features/reviews/reviews.slice'

const ReviewForm = ({ account }: { account: Account }) => {
	const [form] = Form.useForm()
	const dispatch = useAppDispatch()

	const handleSubmit = async () => {
		try {
			await form.validateFields()
			const values = form.getFieldsValue()
			values.account_id = account.account_id
			await dispatch(createReview(values))
			message.success('Successfully created review')
			form.resetFields()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Typography.Title level={4}>Worked with me? Leave a review!</Typography.Title>
			<Form form={form} layout="vertical">
				<Form.Item name="rating" rules={[{ required: true }]}>
					<Rate allowHalf />
				</Form.Item>
				<Form.Item name="content" rules={[{ required: true }]}>
					<Input.TextArea />
				</Form.Item>
			</Form>
			<Row justify="end">
				<Button type="primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Row>
		</>
	)
}

export default ReviewForm
