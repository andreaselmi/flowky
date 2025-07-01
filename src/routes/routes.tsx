import { createBrowserRouter, RouterProvider } from "react-router";

import Auth from "@/features/auth/auth";
import Home from "@/features/home/home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
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
