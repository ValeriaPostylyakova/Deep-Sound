import Box from '@mui/material/Box'

import type { FC } from 'react'
import { Logo } from '../../ui'

interface Props {}

export const Header: FC<Props> = () => {
	return (
		<Box className="mb-16 flex items-center justify-between">
			<Logo />
		</Box>
	)
}
