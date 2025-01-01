export default async function PropertyPage({ params, searchParams }) {
	// await params and searchParams before use
	const { id } = await params;
	const { name } = await searchParams;
	return (
		<>
			<div>Property Page: {id}</div>
			<div>Property Owner: {name}</div>
			{/* <div>Property Path: {pathName}</div> */}
			{/* <button onClick={() => router.replace("/")}>Go Home</button> */}
		</>
	);
}
