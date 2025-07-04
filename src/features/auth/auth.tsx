import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";

import AuthView from "./auth.view/auth.view";

const provider = new GoogleAuthProvider();

const Auth = () => {
	const { toggleTheme, theme } = useTheme();
	const { user } = useAuth();
	const auth = getAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const handleGoogleSignIn = async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error(error);
		}
	};

	const handleFacebookSignIn = () => {
		console.log("Facebook");
	};

	useEffect(() => {
		if (user?.id) {
			navigate("/");
		} else {
			setLoading(false);
		}
	}, [user, navigate]);

	return (
		<AuthView
			toggleTheme={toggleTheme}
			theme={theme}
			handleGoogleSignIn={handleGoogleSignIn}
			handleFacebookSignIn={handleFacebookSignIn}
			loading={loading}
		/>
	);
};

export default Auth;
