import { Components, Theme } from '@mui/material'
import { muiButton } from './button'
import { muiChip } from './chip'
import { muiTextField } from './textField'
import { muiToggleButton } from './toggleButton'
import { muiToggleButtonGroup } from './toggleButtonGroup'
import { muiTypography } from './typography'

export const components: Components<Theme> = {
	MuiButton: muiButton,
	MuiChip: muiChip,
	...muiTextField,
	MuiTypography: muiTypography,
	MuiToggleButton: muiToggleButton,
	MuiToggleButtonGroup: muiToggleButtonGroup
}
