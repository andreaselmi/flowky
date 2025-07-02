import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		return result;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export { signInWithGoogle };
