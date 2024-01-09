import { Form, Input, Modal, Select } from 'antd'
import { useTypedSelector, useAppDispatch } from '../../hooks'
import { GenreSelect } from '../../components'

import { updateAccount } from '../../../features/auth/auth.slice'

type TUpdateProfileFormProps = {
	modal: any
	setModal: React.Dispatch<any>
}

const UpdateProfileForm = ({ modal, setModal }: TUpdateProfileFormProps) => {
	const [form] = Form.useForm()
	const { account, status } = useTypedSelector((state) => state.auth)
	const dispatch = useAppDispatch()

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
				</Form>
			</Modal>
		</>
	)
}

export default UpdateProfileForm
