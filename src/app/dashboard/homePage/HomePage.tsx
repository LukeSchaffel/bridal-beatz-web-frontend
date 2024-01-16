import { Typography, Skeleton, Segmented, Select, Spin } from 'antd'
import { useTypedSelector, useAppDispatch } from '../../hooks'

import { getAccounts } from '../../../features/accounts/accounts.slice'
import { useEffect, useState } from 'react'
import ProfileCard from './profileCard/ProfileCard'
import styles from './_home_page.module.scss'
import { states } from '../../../utils/misc'

const { Title } = Typography

type TQueryState = {
	type: Account['type']
	search: string
	client_type: Account['client_type']
	vendor_type: Account['vendor_type']
	state: string
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
		state: '',
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
	}, [query])

	const onSegmentedChange = (value) => {
		setQuery({
			...query,
			[account.type === 'client' ? 'vendor_type' : 'client_type']: value,
		})
	}

	const vendorSegmented = (
		<Segmented
			options={[
				{
					label: 'Any client',
					value: '',
				},
				{
					label: 'Bride',
					value: 'bride',
				},
				{ label: 'Groom', value: 'groom' },
				{ label: 'Venue', value: 'venue' },
			]}
			onChange={onSegmentedChange}
		/>
	)
	const clientSegmented = (
		<Segmented
			options={[
				{
					label: 'Any vendor',
					value: '',
				},
				{
					label: 'Band',
					value: 'band',
				},
				{ label: 'DJ', value: 'dj' },
				{ label: 'Musician', value: 'musician' },
			]}
			onChange={onSegmentedChange}
		/>
	)

	const onSelectChange = (value) => {
		setQuery({
			...query,
			state: value,
		})
	}

	return (
		<>
			<div className={styles.main}>
				<Title>Welcome {account.first_name}</Title>
				<div className={styles.header}>
					Im looking for a {account.type === 'vendor' && vendorSegmented} {account.type === 'client' && clientSegmented}{' '}
					in: <Select allowClear onChange={onSelectChange} style={{ width: 100 }} options={states} />
				</div>
				<br />
				<div>
					{status === 'pending' ? (
						<div className={styles.spinContainer}>
							<Spin size="large" />
						</div>
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
