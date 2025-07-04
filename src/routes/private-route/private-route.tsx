import { Navigate } from "react-router";

import { useAuth } from "@/context/auth";

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { user } = useAuth();

	if (!user?.id) {
		return <Navigate to="/auth" />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
