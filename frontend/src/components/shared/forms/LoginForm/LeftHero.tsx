'use client'

import AlbumIcon from '@mui/icons-material/Album'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, Variants } from 'framer-motion'

const shakeVariants: Variants = {
	hover: {
		x: [0, -4, 4, -4, 4, -2, 2, 0],
		rotate: [0, -1, 1, -1, 1, -0.5, 0.5, 0],
		transition: {
			duration: 0.4,
			ease: 'easeInOut'
		}
	}
}

export default function LeftHero() {
	return (
		<Box className="relative hidden md:flex w-[60%] overflow-hidden items-center justify-center bg-background premium-gradient max-h-screen">
			<div className="absolute inset-0 z-0"></div>
			<div className="bento-grid relative z-10 p-8">
				<motion.div
					className="bento-item col-span-2 row-span-3 overflow-hidden"
					variants={shakeVariants}
					whileHover="hover"
				>
					<img
						className="w-full h-full object-cover"
						src="/auth/login/card-1.png"
						alt=""
					/>
				</motion.div>
				<motion.div
					className="bento-item col-span-2 row-span-2 overflow-hidden"
					variants={shakeVariants}
					whileHover="hover"
				>
					<img
						className="w-full h-full object-cover"
						src="/auth/login/card-3.png"
						alt=""
					/>
				</motion.div>
				<motion.div
					className="bento-item col-span-2 row-span-4 overflow-hidden"
					variants={shakeVariants}
					whileHover="hover"
				>
					<img
						className="w-full h-full object-cover"
						src="/auth/login/card-5.png"
						alt=""
					/>
				</motion.div>
				<motion.div
					className="bento-item col-span-2 row-span-2 overflow-hidden"
					variants={shakeVariants}
					whileHover="hover"
				>
					<div className="w-full h-full bg-orange-500 flex items-center justify-center p-8">
						<span className="material-symbols-outlined text-on-primary-container text-8xl">
							<AlbumIcon
								sx={{
									width: 100,
									height: 100,
									color: theme => theme.custom.tokens.primary[200]
								}}
							/>
						</span>
					</div>
				</motion.div>
				<motion.div
					className="bento-item col-span-2 row-span-3 overflow-hidden"
					variants={shakeVariants}
					whileHover="hover"
				>
					<img
						className="w-full h-full object-cover"
						src="/auth/login/card-2.png"
						alt=""
					/>
				</motion.div>
				<motion.div
					className="bento-item col-span-2 row-span-2 overflow-hidden"
					variants={shakeVariants}
					whileHover="hover"
				>
					<img
						className="w-full h-full object-cover"
						src="/auth/login/card-4.png"
						alt=""
					/>
				</motion.div>
			</div>

			<div className="absolute bottom-12 left-12 z-20 glass-panel p-6 rounded-3xl max-w-sm opacity-90">
				<Typography sx={{ mb: 1 }}>Звук, который вы чувствуете.</Typography>
				<Typography sx={{ color: 'text.secondary' }}>
					Погрузитесь в коллекцию из 100 миллионов треков в качестве Hi-Res
					Lossless.
				</Typography>
			</div>
		</Box>
	)
}
