import { Button, Image, Row, Modal } from 'antd'
import { CameraOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTypedSelector } from '../../../hooks'

import { ImageUpload } from '../../../components'
import styles from './_photo_section.module.scss'

const PhotoSection = ({ isMyAccount }: { isMyAccount: boolean }) => {
	const { accounts, selectedAccount, status } = useTypedSelector((state) => state.accounts)
	const [{ confirm }, contextHolder] = Modal.useModal()

	const handleDeltePhoto = (idx) => {
		confirm({
			title: 'Delte this photo?',
			onOk: () => console.log('asdf'),
		})
	}

	return (
		<div className={styles.photos}>
			{contextHolder}
			<Image.PreviewGroup
				items={[...selectedAccount.images.map((i) => i.url)]}
				preview={{
					toolbarRender: (node, info) => {
						return (
							<Row align="middle">
								<Button icon={<DeleteOutlined />} danger onClick={() => handleDeltePhoto(info.current)}>
									Delete
								</Button>
								{node}
							</Row>
						)
					},
				}}
			>
				<div className={styles.imgWrapper}>
					<Image
						height={'100%'}
						className={styles.img}
						alt="cover"
						src={
							selectedAccount?.images[0]?.url ||
							'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
						}
					/>
				</div>
				<div className={styles.imgWrapper}>
					<Image
						height={'100%'}
						className={styles.img}
						alt="cover"
						src={selectedAccount?.images[1]?.url || 'https://picsum.photos/200/300'}
					/>
				</div>
				<div className={styles.imgWrapper}>
					<Image
						height={'100%'}
						className={styles.img}
						alt="cover"
						src={selectedAccount?.images[2]?.url || 'https://picsum.photos/400/600'}
					/>
				</div>
				<div className={styles.imgWrapper}>
					<Image
						height={'100%'}
						className={styles.img}
						alt="cover"
						src={selectedAccount?.images[3]?.url || 'https://picsum.photos/500/200'}
					/>
				</div>
			</Image.PreviewGroup>
			<div className={styles.buttonContainer} hidden={!isMyAccount}>
				<ImageUpload account={selectedAccount} type="avatar" buttonProps={{ type: 'primary' }} />
			</div>
		</div>
	)
}

export default PhotoSection
