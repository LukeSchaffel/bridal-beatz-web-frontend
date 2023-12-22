import { Typography } from 'antd'

import { useTypedSelector } from '../../hooks'
import styles from './_home_page.module.scss'

const { Title } = Typography
const HomePage = () => {
	const { account } = useTypedSelector((state) => state.auth)
	return (
		<>
			<div className={styles.main}>
				<Title>Welcome {account.first_name}</Title>
			</div>
		</>
	)
}

export default HomePage
