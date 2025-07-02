import { useContext } from "react";

import AuthContext from "./auth-context";

const useAuth = () => {
	return useContext(AuthContext);
};

export default useAuth;
