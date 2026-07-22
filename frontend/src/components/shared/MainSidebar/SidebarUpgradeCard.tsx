import { Box, Button, Paper, Typography } from '@mui/material'

interface Props {
	title: string
	description: string
	buttonText: string
}

export const SidebarUpgradeCard = ({
	title,
	description,
	buttonText
}: Props) => {
	return (
		<Paper
			elevation={0}
			sx={{
				p: 3,
				position: 'relative',
				overflow: 'hidden'
			}}
		>
			<Box sx={{ position: 'relative', zIndex: 50 }}>
				<Typography
					variant="h6"
					sx={{ mb: 1, fontWeight: 700 }}
				>
					{title}
				</Typography>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 3, color: 'text.secondary' }}
				>
					{description}
				</Typography>

				<Button fullWidth>{buttonText}</Button>
			</Box>

			<Box
				sx={theme => ({
					position: 'absolute',
					right: -40,
					bottom: -40,
					width: 120,
					height: 120,
					borderRadius: '50%',
					backgroundColor: theme.palette.primary.main,
					opacity: 0.1,
					filter: 'blur(40px)'
				})}
			/>
		</Paper>
	)
}
