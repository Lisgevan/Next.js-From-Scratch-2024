"use client";

import { useRouter, useParams, useSearchParams, usePathname } from "next/navigation";

export default function PropertyPage() {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	const pathName = usePathname();

	return (
		<>
			<div>Property Page: {params.id}</div>
			<div>Property Owner: {searchParams.get("name")}</div>
			<div>Property Path: {pathName}</div>
			<button onClick={() => router.replace("/")}>Go Home</button>
		</>
	);
}
