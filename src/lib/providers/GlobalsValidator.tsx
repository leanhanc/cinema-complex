/* Utils */
import { validateRequiredGlobals } from '@/app/(payload)/utils/validateRequiredGlobals';

/* Components */
import LoadingScreen from '@/_components/LoadingScreen';

async function GlobalsValidator({ children }: { children: React.ReactNode }) {
	try {
		await validateRequiredGlobals();
		return <>{children}</>;
	} catch (error) {
		return (
			<LoadingScreen
				error={error instanceof Error ? error.message : 'Configuration error'}
			/>
		);
	}
}

export default GlobalsValidator;
