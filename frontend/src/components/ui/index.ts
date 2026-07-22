import { Components, Theme } from '@mui/material'
import { muiButton } from './mui/button'
import { muiChip } from './mui/chip'
import { muiTextField } from './mui/textField'
import { muiToggleButton } from './mui/toggleButton'
import { muiToggleButtonGroup } from './mui/toggleButtonGroup'
import { muiTypography } from './mui/typography'
import { muiDrawer } from './mui/drawer'
import { muiListItemButton } from './mui/listItemButton'
import { muiListItemIcon } from './mui/listItemIcon'
import { muiPaper } from './mui/paper'

export const components: Components<Theme> = {
	MuiButton: muiButton,
	MuiChip: muiChip,
	...muiTextField,
	MuiTypography: muiTypography,
	MuiToggleButton: muiToggleButton,
	MuiToggleButtonGroup: muiToggleButtonGroup,
	MuiDrawer: muiDrawer,
	MuiListItemButton: muiListItemButton,
	MuiListItemIcon: muiListItemIcon,
	MuiPaper: muiPaper
}

export * from './DividerWithText'
export * from './PulseButton'
export * from './Logo'
export * from './NotificationBell'
