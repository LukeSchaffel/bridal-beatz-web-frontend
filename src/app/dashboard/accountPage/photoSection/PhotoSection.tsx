import { Image } from 'antd'

import { useTypedSelector } from '../../../hooks'
import styles from './_photo_section.module.scss'

const PhotoSection = () => {
	const { accounts, selectedAccount, status } = useTypedSelector((state) => state.accounts)
	return (
		<div className={styles.photos}>
			<Image.PreviewGroup
				items={[
					...selectedAccount.images.map((i) => i.url),
					'https://picsum.photos/200/300',
					'https://picsum.photos/400/600',
					'https://picsum.photos/500/200',
				]}
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
					<Image height={'100%'} className={styles.img} alt="cover" src={'https://picsum.photos/200/300'} />
				</div>
				<div className={styles.imgWrapper}>
					<Image height={'100%'} className={styles.img} alt="cover" src={'https://picsum.photos/400/600'} />
				</div>
				<div className={styles.imgWrapper}>
					<Image height={'100%'} className={styles.img} alt="cover" src={'https://picsum.photos/500/200'} />
				</div>
			</Image.PreviewGroup>
		</div>
	)
}

export default PhotoSection
