import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import { ButtonProps } from 'antd'
import { CameraOutlined } from '@ant-design/icons'

import { refreshUser } from '../../../features/auth/auth.slice'
import { api } from '../../../utils/api'
import { useAppDispatch } from '../../hooks'

const getBase64 = (img, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!')
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!')
	}
	return isJpgOrPng && isLt2M
}

const ImageUpload = ({
	account,
	type,
	buttonProps,
}: {
	account: Account
	type: 'avatar' | 'bulk'
	buttonProps: ButtonProps
}) => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>(account?.images?.find((img) => img.avatar)?.url || '')
	const [fileObj, setFileObj] = useState(undefined)

	const sendUploadReq = async () => {
		try {
			const form = new FormData()
			form.append('image', fileObj)
			const { data } = await api.post(`/images/uploadImage/${account.account_id}?type=${type}`, form, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			setImageUrl(data.data)
			dispatch(refreshUser())
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const handleChange = async (info) => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			setFileObj(info.file.originFileObj)
			return
		}

		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (url) => {
				setLoading(false)
				setImageUrl(url)
			})
		}
	}

	return (
		<>
			<Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange} customRequest={sendUploadReq}>
				<Button {...buttonProps} icon={<CameraOutlined />} type="primary">
					Add photos
				</Button>
			</Upload>
		</>
	)
}

export default ImageUpload
