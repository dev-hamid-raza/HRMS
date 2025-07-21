export interface AuthContextType {
	isAuthenticated: boolean;
	loading: boolean;
	setIsAuthenticated: (value: boolean) => void;
	setLoading: (value: boolean) => void;
}

export interface AuthProviderProps {
	children: React.ReactNode;
}