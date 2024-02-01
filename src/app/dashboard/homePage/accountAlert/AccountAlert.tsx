import { Alert } from 'antd'

import { useTypedSelector } from '../../../hooks'
const AccountAlert = () => {
	const { account } = useTypedSelector((state) => state.auth)
	let missing = ''
	let message = ''
	if (account?.locations.length === 0) {
		missing += 'Location '
	}
	if (account?.genre.length === 0) {
		missing += 'Genre '
	}

	if (missing.length) {
		message = `Your account is incomplete, add at least one of the following for better search results: ${missing
			.trim()
			.split(' ')
			.join(', ')}`
	}
	if (!message) {
		return
	}

	return <Alert closable type="warning" message={message} />
}

export default AccountAlert
