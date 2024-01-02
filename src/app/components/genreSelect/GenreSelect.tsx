import { Select } from 'antd'

const GenreSelect = () => {
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
	return <Select mode="tags" options={options} />
}

export default GenreSelect
