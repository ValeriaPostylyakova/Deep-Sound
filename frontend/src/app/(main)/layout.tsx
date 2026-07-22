import { Header, Sidebar } from '@/src/components/shared'

export default function PublicLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex w-full min-h-screen bg-background">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	)
}
