export default function LoadingScreen({ error }: { error?: string }) {
	return (
		<div className="min-h-screen w-full flex items-center justify-center text-white">
			<div className="text-center p-4">
				{error ? (
					<div className="text-red-500">
						<h1 className="text-xl font-bold mb-2">Configuration Error</h1>
						<p className="mt-10 text-gray-900">{error}</p>
						<p className="mt-4 text-sm text-gray-900">
							Please configure the required settings in the Customization
							section of the admin panel.
						</p>
					</div>
				) : (
					<div className="flex flex-col items-center">
						<div className="w-12 h-12 border-4 border-t-white border-r-transparent border-b-white border-l-transparent rounded-full animate-spin mb-4" />
						<p>Loading cinema configuration...</p>
					</div>
				)}
			</div>
		</div>
	);
}
