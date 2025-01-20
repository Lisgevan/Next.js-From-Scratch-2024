"use server";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloujdinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

async function deleteProperty(propertyId) {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required!!");
	}

	const { userId } = sessionUser;

	const property = await Property.findById(propertyId);
	if (!property) {
		throw new Error("Property Not Found!!");
	}

	//Verify ownership
	if (property.owner.toString() !== userId) {
		throw new Error("Unauthorized");
	}

	//// Delete images from cloudinary
	// Extract public ID from image Urls
	const publicIds = property.images.map(imageUrl => {
		const parts = imageUrl.split("/");
		return parts.at(-1).split(".").at(0);
	});

	//delete images
	if (publicIds.length > 0) {
		for (let publicId of publicIds) {
			await cloudinary.uploader.destroy("propertypulse/" + publicId);
		}
	}

	await property.deleteOne();

	// console.log("Revalidating path...");
	// revalidatePath("/");
	// console.log("Revalidation triggered for /");

	revalidatePath("/", "layout");
	// console.log("Revalidating path:", revalidatePath("/"));
}

export default deleteProperty;
