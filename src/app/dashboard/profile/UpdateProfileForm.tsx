import { Form, Input, Modal, Select } from 'antd'
import { useTypedSelector } from '../../hooks'
import { GenreSelect } from '../../components'

type TUpdateProfileFormProps = {
	modal: any
	setModal: React.Dispatch<any>
}

const UpdateProfileForm = ({ modal, setModal }: TUpdateProfileFormProps) => {
	const [form] = Form.useForm()
	const { account } = useTypedSelector((state) => state.auth)
	const genres = Form.useWatch('genre', form)

	const handleClose = () => {
		setModal(null)
	}

	const type = account.type === 'admin' ? 'admin' : account.vendor_type ? 'vendor' : 'client'
	console.log(genres)

	return (
		<>
			<Modal open={!!modal} onCancel={handleClose}>
				<Form form={form} layout="vertical">
					<Form.Item name="first_name" label="First name">
						<Input />
					</Form.Item>
					<Form.Item name="last_name" label="Last name">
						<Input />
					</Form.Item>
					<Form.Item name="phone" label="Phone number">
						<Input />
					</Form.Item>
					<Form.Item name={type === 'vendor' ? 'vendor_type' : 'account_type'} label={'Type'}>
						<Input />
					</Form.Item>
					<Form.Item name="genre" label="Genre (select all that apply)">
						<GenreSelect />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default UpdateProfileForm
