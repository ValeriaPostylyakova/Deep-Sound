import QueryProvider from './query.provider'
import ThemeGlobalProvider from './theme.global.provider'
import ToastProvider from './toast.provider'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<ToastProvider />
			<ThemeGlobalProvider>{children}</ThemeGlobalProvider>
		</QueryProvider>
	)
}
