import { createContext } from "react";

export type User = {
	id: string;
	email: string;
};

interface AuthContextType {
	user: User | null;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
});

export default AuthContext;
