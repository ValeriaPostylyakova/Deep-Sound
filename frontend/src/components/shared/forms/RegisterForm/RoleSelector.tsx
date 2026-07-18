'use client'

import HeadphonesIcon from '@mui/icons-material/Headphones'
import MicIcon from '@mui/icons-material/Mic'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface Props {
	value: string
	onChange(value: string): void
}

export default function RoleSelector({ value, onChange }: Props) {
	return (
		<ToggleButtonGroup
			exclusive
			fullWidth
			value={value}
			onChange={(_, v) => v && onChange(v)}
		>
			<ToggleButton
				size="large"
				value="user"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '0.5rem'
				}}
			>
				<HeadphonesIcon />
				<span>Слушатель</span>
			</ToggleButton>

			<ToggleButton
				size="large"
				value="artist"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '0.5rem'
				}}
			>
				<MicIcon />
				<span>Исполнитель</span>
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
