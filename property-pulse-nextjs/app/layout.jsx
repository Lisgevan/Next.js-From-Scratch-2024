import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export const metadata = {
	title: "Property Pulse",
	keywords: "rental, property, real estate",
	description: "Find the perfect reantal property",
};

export default function MainLayout({ children }) {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<NavBar />
					<main>{children}</main>
					<Footer />
					<ToastContainer />
				</body>
			</html>
		</AuthProvider>
	);
}

