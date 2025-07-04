import { createContext } from "react";

export type User = {
	id: string;
	email: string;
};

interface AuthContextType {
	user: User | null;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
});

export default AuthContext;
