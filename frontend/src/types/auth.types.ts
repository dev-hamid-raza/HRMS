import type { ApiResponse } from "./api.types"

export interface IUser {
	username: string
	email: string
	firstName: string
	lastName: string
}

export type IUserResponse = ApiResponse<IUser>

export interface AuthContextType {
	isAuthenticated: boolean;
	loading: boolean;
	user: IUser
	setUser: (value: IUser) => void
	setIsAuthenticated: (value: boolean) => void;
	setLoading: (value: boolean) => void;
}

export interface AuthProviderProps {
	children: React.ReactNode;
}