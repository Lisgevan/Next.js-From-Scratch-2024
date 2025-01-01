import InfoBox from "./InfoBox";

export default function InfoBoxes() {
	return (
		<section>
			<div className="container-xl lg:container m-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
					{/* <div className="bg-gray-100 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold">For Renters</h2>
						<p className="mt-2 mb-4">Find your dream rental property. Bookmark properties and contact owners.</p>
						<Link
							href="/properties"
							className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
						>
							Browse Properties
						</Link>
					</div>
					<div className="bg-blue-100 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold">For Property Owners</h2>
						<p className="mt-2 mb-4">
							List your properties and reach potential tenants. Rent as an airbnb or long term.
						</p>
						<Link
							href="/properties/add"
							className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
						>
							Add Property
						</Link>
					</div> */}
					<InfoBox
						heading="For Renters"
						buttonInfo={{ text: "Browse Properties", link: "/properties", backgroundColor: "bg-black" }}
					>
						Find your dream rental property. Bookmark properties and contact owners.
					</InfoBox>
					<InfoBox
						heading="For Property Owners"
						backgroundColor="bg-blue-100"
						buttonInfo={{ text: "Add Property", link: "/properties/add", backgroundColor: "bg-blue-500" }}
					>
						List your properties and reach potential tenants. Rent as an airbnb or long term.
					</InfoBox>
				</div>
			</div>
		</section>
	);
}