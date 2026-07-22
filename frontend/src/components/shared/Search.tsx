'use client'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'

import type { FC } from 'react'

interface Props {}

export const Search: FC<Props> = () => {
	const [query, setQuery] = useState<string>('')

	const handleSearch = () => {}

	const handleClear = () => {}

	return (
		<TextField
			variant="outlined"
			value={query}
			onChange={e => setQuery(e.target.value)}
			onKeyDown={e => e.key === 'Enter' && handleSearch()}
			placeholder="Поиск..."
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<IconButton
								onClick={handleSearch}
								edge="start"
							>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
					endAdornment: query && (
						<InputAdornment position="end">
							<IconButton
								onClick={handleClear}
								edge="end"
							>
								<CloseIcon />
							</IconButton>
						</InputAdornment>
					)
				}
			}}
		/>
	)
}
