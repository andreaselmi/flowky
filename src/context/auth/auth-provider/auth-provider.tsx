import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";

import { initializeFirebase } from "@/helpers/firebase";

import AuthContext, { type User } from "../auth-context";

initializeFirebase();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser({
					id: user.uid,
					email: user.email ?? "",
				});
				setLoading(false);
			} else {
				// user is signed out
				setUser(null);
				setLoading(false);
				console.log("user is signed out");
			}
		});
	}, []);

	const memoizedUser = useMemo(() => user, [user]);

	if (loading) return <div>Loading...</div>;

	return (
		<AuthContext.Provider value={{ user: memoizedUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
