import { motion } from 'framer-motion'

const albums = [
	{
		src: '/auth/register/card-1.png',
		className: 'w-48 h-48'
	},
	{
		src: '/auth/register/card-2.png',
		className: 'w-64 h-64 -translate-y-8'
	},
	{
		src: '/auth/register/card-3.png',
		className: 'w-40 h-40 translate-y-4'
	}
]

export default function AlbumCards() {
	return (
		<div className="mt-12 flex gap-4">
			{albums.map((album, index) => (
				<motion.div
					whileHover={{
						scale: 1.05
					}}
					key={index}
					className={`${album.className} overflow-hidden rounded-3xl shadow-primary`}
				>
					<img
						src={album.src}
						alt=""
						className="h-full w-full object-cover"
					/>
				</motion.div>
			))}
		</div>
	)
}
