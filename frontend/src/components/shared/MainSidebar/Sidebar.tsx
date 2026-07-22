'use client'

import {
	AlbumRounded,
	ExploreRounded,
	FavoriteRounded,
	HomeRounded,
	LibraryMusicRounded,
	PersonRounded,
	SearchRounded
} from '@mui/icons-material'
import { Box, Drawer } from '@mui/material'

import { Logo } from '../../ui'
import { SidebarNavItem } from './SidebarNavItem'
import { SidebarSection } from './SidebarSection'
import { SidebarUpgradeCard } from './SidebarUpgradeCard'

const SIDEBAR_WIDTH = 300

export const Sidebar = () => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: SIDEBAR_WIDTH,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: SIDEBAR_WIDTH,
					boxSizing: 'border-box',
					p: 3,
					display: 'flex',
					flexDirection: 'column'
				}
			}}
		>
			<Logo />

			<SidebarSection title="Обзор музыки">
				<SidebarNavItem
					active
					icon={<HomeRounded />}
					label="Главная"
				/>

				<SidebarNavItem
					icon={<ExploreRounded />}
					label="Исследование"
				/>

				<SidebarNavItem
					icon={<SearchRounded />}
					label="Поиск"
				/>
			</SidebarSection>

			<SidebarSection title="Библиотека">
				<SidebarNavItem
					icon={<LibraryMusicRounded />}
					label="Медиатека"
				/>

				<SidebarNavItem
					icon={<FavoriteRounded />}
					label="Любимые треки"
				/>

				<SidebarNavItem
					icon={<PersonRounded />}
					label="Артисты"
				/>

				<SidebarNavItem
					icon={<AlbumRounded />}
					label="Недавние"
				/>
			</SidebarSection>

			<Box sx={{ flexGrow: 1 }} />

			<SidebarUpgradeCard
				title="Перейти на Plus"
				description="Музыка без рекламы и высокое качество звука."
				buttonText="Начать"
			/>
		</Drawer>
	)
}
