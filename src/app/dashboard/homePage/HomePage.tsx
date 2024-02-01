import { Typography, Skeleton, Segmented, Select, Spin, Row, Col, Space, Input } from 'antd'
import { useTypedSelector, useAppDispatch } from '../../hooks'

import AccountAlert from './accountAlert/AccountAlert'
import { getAccounts } from '../../../features/accounts/accounts.slice'
import { useEffect, useRef, useState } from 'react'
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
	take: string
	sort_by: 'review_count' | 'average_rating' | 'score'
}

const segmentedStyles = {
	borderRadius: 0,
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
		take: '10',
		sort_by: 'score',
	}
	const [query, setQuery] = useState({ ...initialQueryState })
	const timeoutRef = useRef(null)

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

	const onSegmentedChange = (value: Account['client_type'] | Account['vendor_type']) => {
		setQuery({
			...query,
			[account.type === 'client' ? 'vendor_type' : 'client_type']: value,
		})
	}

	const vendorSegmented = (
		<Segmented
			style={segmentedStyles}
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
			style={segmentedStyles}
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

	const onSelectChange = (value: string) => {
		setQuery({
			...query,
			state: value,
		})
	}

	const onSearchChange = (e) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		timeoutRef.current = setTimeout(() => {
			setQuery({
				...query,
				search: e.target.value,
			})
			clearTimeout(timeoutRef.current)
		}, 500)
	}

	const onSearchSearch = (value: string) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		setQuery({
			...query,
			search: value,
		})
	}

	return (
		<>
			<div className={styles.main}>
				<AccountAlert />
				<Title>Welcome {account.first_name}</Title>
				<Space.Compact direction="horizontal" block>
					<Input.Search
						placeholder="Name, Bio"
						allowClear
						style={{ maxWidth: '200px' }}
						onChange={onSearchChange}
						onSearch={onSearchSearch}
					/>
					{account.type === 'vendor' && vendorSegmented} {account.type === 'client' && clientSegmented}
					<Select placeholder="State" allowClear onChange={onSelectChange} style={{ width: 100 }} options={states} />
					<Select
						value={query.take}
						style={{ width: '100px' }}
						onChange={(value) => {
							setQuery({
								...query,
								take: value,
							})
						}}
						options={[
							{ label: '10', value: '10' },
							{ label: '20', value: '20' },
							{ label: '50', value: '50' },
							{ label: '100', value: '100' },
							{ label: 'All', value: '0' },
						]}
					/>
					<Select
						style={{ width: '200px' }}
						value={query.sort_by}
						onChange={(value) => {
							setQuery({
								...query,
								sort_by: value,
							})
						}}
						options={[
							{
								label: 'Average rating',
								value: 'average_rating',
							},
							{ label: 'Number of reviews', value: 'total' },
							{ label: 'Reccomended', value: 'score' },
						]}
					/>
				</Space.Compact>
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
