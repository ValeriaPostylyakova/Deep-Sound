import type { Keyframes } from '@emotion/react'
import { Box } from '@mui/material'
import type { FC } from 'react'

interface Props {
	children: React.ReactNode
	borderColor?: string
	backgroundColor?: string
	keyframes: Keyframes
}

export const PulseButton: FC<Props> = ({ children, ...props }) => {
	return (
		<Box
			sx={{
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: 48,
				height: 48,
				borderRadius: '50%',
				border: '2px solid',
				borderColor: props.borderColor ?? 'primary.main',
				backgroundColor: props.backgroundColor ?? 'background.paper',
				animation: `${props.keyframes} 2s infinite ease-in-out`
			}}
		>
			{children}
		</Box>
	)
}
