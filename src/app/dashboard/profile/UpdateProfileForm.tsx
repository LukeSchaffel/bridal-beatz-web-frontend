import { Button, Col, Divider, Form, Input, Modal, Row, Select } from 'antd'
import { useTypedSelector, useAppDispatch } from '../../hooks'
import { GenreSelect } from '../../components'
import { DeleteOutlined } from '@ant-design/icons'

import { updateAccount } from '../../../features/auth/auth.slice'
import { useState } from 'react'

type TUpdateProfileFormProps = {
	modal: any
	setModal: React.Dispatch<any>
}

const UpdateProfileForm = ({ modal, setModal }: TUpdateProfileFormProps) => {
	const [form] = Form.useForm()
	const { account, status } = useTypedSelector((state) => state.auth)
	const locations = Form.useWatch('locations', form)
	const dispatch = useAppDispatch()
	const [additionalLocations, setAdditionalLocations] = useState<number>(0)
	console.log(locations)

	const handleClose = () => {
		setModal(null)
	}

	const options = [
		{
			label: 'Pop',
			value: 'pop',
		},
		{
			label: 'Rock',
			value: 'rock',
		},
		{
			label: 'Rap',
			value: 'rap',
		},
		{
			label: 'Hip hop',
			value: 'hiphop',
		},
		{
			label: 'Country',
			value: 'country',
		},
		{
			label: 'R & B',
			value: 'randb',
		},
		{
			label: 'Jazz',
			value: 'jazz',
		},
		{
			label: 'Electronic',
			value: 'electronic',
		},
		{
			label: 'Funk',
			value: 'funk',
		},
		{
			label: 'Reggae',
			value: 'reggae',
		},
		{
			label: 'Disco',
			value: 'disco',
		},
		{
			label: 'Classical',
			value: 'classical',
		},
		{
			label: 'Church',
			value: 'church',
		},
	]

	const type = account.type === 'admin' ? 'admin' : account.type === 'vendor' ? 'vendor' : 'client'

	const handleSubmit = async () => {
		const values = form.getFieldsValue()
		await dispatch(updateAccount(values))
		handleClose()
	}

	const vendorTypeSelect = (
		<Select
			options={[
				{
					label: 'Band',
					value: 'band',
				},
				{
					label: 'DJ',
					value: 'dj',
				},
				{
					label: 'Musician',
					value: 'musician',
				},
			]}
		/>
	)
	const clientTypeSelect = (
		<Select
			options={[
				{
					label: 'Bride',
					value: 'bride',
				},
				{
					label: 'Groom',
					value: 'groom',
				},
				{
					label: 'Wedding planner',
					value: 'planner',
				},
				{
					label: 'Venue',
					value: 'venue',
				},
			]}
		/>
	)

	return (
		<>
			<Modal open={!!modal} onCancel={handleClose} onOk={handleSubmit} confirmLoading={status === 'pending'}>
				<Form form={form} layout="vertical" initialValues={account}>
					<Form.Item name="first_name" label="First name">
						<Input />
					</Form.Item>
					<Form.Item name="last_name" label="Last name">
						<Input />
					</Form.Item>
					<Form.Item name="phone" label="Phone number">
						<Input type="phone" />
					</Form.Item>
					<Form.Item name={type === 'vendor' ? 'vendor_type' : 'account_type'} label={'Type'}>
						{type === 'vendor' ? vendorTypeSelect : clientTypeSelect}
					</Form.Item>
					<Form.Item name="genre" label="Genre (select all that apply)">
						<Select mode="multiple" options={options} />
					</Form.Item>
					<Form.List name={'locations'}>
						{(fields, { add, remove }) => (
							<div>
								{fields.map((field, i) => {
									return (
										<Row gutter={[0, 0]} key={i} wrap={false} align={'middle'}>
											<Col flex={1}>
												<Row gutter={[16, 0]}>
													<Col span={8}>
														<Form.Item label="City" name={[field.name, 'city']}>
															<Input />
														</Form.Item>
													</Col>
													<Col span={8}>
														<Form.Item label="State" name={[field.name, 'state']}>
															<Input />
														</Form.Item>
													</Col>
													<Col span={8}>
														<Form.Item label="Zip code" name={[field.name, 'zip']}>
															<Input />
														</Form.Item>
													</Col>
												</Row>
											</Col>
											<Col>
												<Divider>
													<Button onClick={() => remove(field.name)} icon={<DeleteOutlined />}></Button>
												</Divider>
											</Col>
										</Row>
									)
								})}
								<Row justify="center">
									<Button type="link" onClick={() => add()}>
										Add another location +
									</Button>
								</Row>
							</div>
						)}
					</Form.List>
				</Form>
			</Modal>
		</>
	)
}

export default UpdateProfileForm
