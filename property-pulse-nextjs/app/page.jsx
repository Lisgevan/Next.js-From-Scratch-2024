import FeaturesProperties from "@/components/FeaturesProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";

export default function HomePage() {
	return (
		<>
			<Hero />
			<InfoBoxes />
			<FeaturesProperties />
			<HomeProperties />
		</>
	);
}

