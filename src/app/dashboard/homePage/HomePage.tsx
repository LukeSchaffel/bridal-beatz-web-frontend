import { Typography, Skeleton } from 'antd'
import { useTypedSelector, useAppDispatch } from '../../hooks'

import { getAccounts } from '../../../features/accounts/accounts.slice'
import styles from './_home_page.module.scss'
import { useEffect, useState } from 'react'
import ProfileCard from './profileCard/ProfileCard'

const { Title } = Typography

type TQueryState = {
	type: Account['type']
	search: string
	client_type: Account['client_type']
	vendor_type: Account['vendor_type']
}

const HomePage = () => {
	const dispatch = useAppDispatch()
	const { account } = useTypedSelector((state) => state.auth)
	const { accounts, status } = useTypedSelector((state) => state.accounts)
	const initialQueryState: TQueryState = {
		type: account.type === 'client' ? 'vendor' : 'client',
		search: '',
		client_type: undefined,
		vendor_type: undefined,
	}
	const [query, setQuery] = useState({ ...initialQueryState })

	const handleGetAccounts = () => {
		let queryString = ''

		Object.entries(query).forEach(([kind, value]) => {
			if (value) {
				queryString += `${kind}=${value}&`
			}
		})

		dispatch(getAccounts(queryString))
	}

	useEffect(() => {
		handleGetAccounts()
	}, [])

	return (
		<>
			<div className={styles.main}>
				<Title>Welcome {account.first_name}</Title>
				<div>
					{status === 'pending' ? (
						<Skeleton active />
					) : (
						<div className={styles.accountsContainer}>
							{accounts.map((account: Account) => (
								<ProfileCard account={account} key={account.account_id} />
							))}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default HomePage
