import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export const metadata = {
	title: "Property Pulse",
	keywords: "rental, property, real estate",
	description: "Find the perfect reantal property",
};

export default function MainLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<NavBar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}

