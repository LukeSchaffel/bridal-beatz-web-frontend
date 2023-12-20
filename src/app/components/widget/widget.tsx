import { theme } from 'antd'

const { useToken } = theme

interface IWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
	children: JSX.Element
	rest?: any
	bordered?: boolean
	style?: React.CSSProperties
	padding?: React.CSSProperties['padding']
}

const Widget = ({ children, style, bordered, padding, ...rest }: IWidgetProps) => {
	const { token } = useToken()

	return (
		<div
			style={{
				backgroundColor: token.colorPrimaryBg,
				padding: padding || token.padding,
				borderRadius: token.borderRadius,
				border: bordered ? `1px solid ${token.colorPrimaryBorder}` : '',
				overflow: 'hidden',
				...style,
			}}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Widget
