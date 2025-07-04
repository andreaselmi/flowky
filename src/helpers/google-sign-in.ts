import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
