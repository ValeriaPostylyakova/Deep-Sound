import Box from '@mui/material/Box'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
	text: string
	linkUrl: string
	linkText: string
}

export const Footer: FC<Props> = ({ text, linkUrl, linkText }) => {
	return (
		<Box className="text-center mt-4 flex items-center gap-2 justify-center">
			<Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{text}</Box>
			<Link href={linkUrl}>
				<Box
					component="span"
					sx={{
						fontSize: '0.875rem',
						color: theme => theme.custom.tokens.primary[700],
						textDecoration: 'none',
						'&:hover': { textDecoration: 'underline' }
					}}
				>
					{linkText}
				</Box>
			</Link>
		</Box>
	)
}
