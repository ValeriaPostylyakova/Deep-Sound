import { Components, Theme } from '@mui/material'
import { muiButton } from './mui/button'
import { muiChip } from './mui/chip'
import { muiTextField } from './mui/textField'
import { muiToggleButton } from './mui/toggleButton'
import { muiToggleButtonGroup } from './mui/toggleButtonGroup'
import { muiTypography } from './mui/typography'

export const components: Components<Theme> = {
	MuiButton: muiButton,
	MuiChip: muiChip,
	...muiTextField,
	MuiTypography: muiTypography,
	MuiToggleButton: muiToggleButton,
	MuiToggleButtonGroup: muiToggleButtonGroup
}

export * from './DividerWithText'
export * from './PulseButton'
