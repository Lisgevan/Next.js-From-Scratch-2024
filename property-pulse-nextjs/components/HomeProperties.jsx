import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

// import properties from "@/properties.json";

//Using MongoDB
export default async function HomeProperties() {
	await connectDB();
	const recentProperties = await Property.find({}).sort({ creratedAt: -1 }).limit(3).lean();

	return (
		<>
			<section className="px-4 py-6">
				<div className="container-xl lg:container m-auto px-4 py-6">
					<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
					{recentProperties.length === 0 ? (
						<p>No properties found</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{recentProperties.map(property => (
								<PropertyCard key={property._id} property={property} />
							))}
						</div>
					)}
				</div>
			</section>
			<section className="m-auto max-w-lg my-6 pk-6">
				<Link
					href="/properties"
					className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
				>
					View All Properties
				</Link>
			</section>
		</>
	);
}

// //Using jason file as DB
// export default function HomeProperties() {
// 	const recentProperties = properties.slice(0, 3);
// 	return (
// 		<>
// 			<section className="px-4 py-6">
// 				<div className="container-xl lg:container m-auto px-4 py-6">
// 					<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
// 					{properties.length === 0 ? (
// 						<p>No properties found</p>
// 					) : (
// 						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// 							{recentProperties.map(property => (
// 								<PropertyCard key={property._id} property={property} />
// 							))}
// 						</div>
// 					)}
// 				</div>
// 			</section>
// 			<section className="m-auto max-w-lg my-6 pk-6">
// 				<Link
// 					href="/properties"
// 					className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
// 				>
// 					View All Properties
// 				</Link>
// 			</section>
// 		</>
// 	);
// }
