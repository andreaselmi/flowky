import { createBrowserRouter, RouterProvider } from "react-router";

import Auth from "@/features/auth/auth";
import Home from "@/features/home/home";

import PrivateRoute from "./private-route/private-route";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Home />
			</PrivateRoute>
		),
	},
	{
		path: "/auth",
		element: <Auth />,
	},
]);

const Routes = () => {
	return <RouterProvider router={router} />;
};

export default Routes;
