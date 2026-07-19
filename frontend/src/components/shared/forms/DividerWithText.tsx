import Box from '@mui/material/Box'
import type { FC } from 'react'

interface Props {}

export const DividerWithText: FC<Props> = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				color: 'text.secondary',
				my: 1
			}}
		>
			<Box
				sx={{
					flexGrow: 1,
					borderTop: '1px solid',
					borderColor: 'inherit'
				}}
			/>
			<Box
				component="span"
				sx={{ mx: 1.5 }}
			>
				или
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					borderTop: '1px solid',
					borderColor: 'inherit'
				}}
			/>
		</Box>
	)
}
