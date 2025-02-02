'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export const HeaderContext = createContext<UseHeaderContextType | undefined>(
	undefined,
);

interface UseHeaderContextType {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (isOpen: boolean) => void;
	shouldShowGoBackIcon: boolean;
	setShouldShowGoBackIcon: (shouldShow: boolean) => void;
}

export const useHeaderContext = () => {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error(
			'useHeaderContext must be used within a HeaderContextProvider',
		);
	}

	return context;
};

const HeaderContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [shouldShowGoBackIcon, setShouldShowGoBackIcon] = useState(false);

	const value = useMemo(
		() => ({
			isMobileMenuOpen,
			setIsMobileMenuOpen,
			shouldShowGoBackIcon,
			setShouldShowGoBackIcon,
		}),
		[isMobileMenuOpen, shouldShowGoBackIcon],
	);

	return (
		<HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
	);
};

export default HeaderContextProvider;
