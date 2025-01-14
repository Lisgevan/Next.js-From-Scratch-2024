"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloujdinary";

async function updateProperty(propertyId, formData) {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		throw new Error("User ID is required!!");
	}

	const { userId } = sessionUser;

	const existingProperty = await Property.findById(propertyId);
	//Verify Owership
	if (existingProperty.owner.toString() !== userId) {
		throw new Error("Current user does not own this property!");
	}

	// Access all valus from amenities and images
	const amenities = formData.getAll("amenities");
	// const images = formData.getAll("images").filter(image => image.vame !== "");

	const propertyData = {
		owner: userId,
		type: formData.get("type"),
		name: formData.get("name"),
		description: formData.get("description"),
		location: {
			street: formData.get("location.street"),
			city: formData.get("location.city"),
			state: formData.get("location.state"),
			zipcode: formData.get("location.zipcode"),
		},
		beds: formData.get("beds"),
		baths: formData.get("baths"),
		square_feet: formData.get("square_feet"),
		amenities,
		rates: {
			nightly: formData.get("rates.nightly"),
			weekly: formData.get("rates.weekly"),
			monthly: formData.get("rates.monthly"),
		},
		seller_info: {
			name: formData.get("seller_info.name"),
			email: formData.get("seller_info.email"),
			phone: formData.get("seller_info.phone"),
		},
	};

	const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);

	// const imageUrls = [];
	// for (const imageFile of images) {
	// 	const imageBuffer = await imageFile.arrayBuffer();
	// 	const imageArray = Array.from(new Uint8Array(imageBuffer));
	// 	const imageData = Buffer.from(imageArray);
	// 	//convert to Base64
	// 	const imageBase64 = imageData.toString("base64");

	// 	//Make request to cloudinary
	// 	const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
	// 		folder: "propertypulse",
	// 	});

	// 	imageUrls.push(result.secure_url);
	// }

	// propertyData.images = imageUrls;

	// const newProperty = new Property(propertyData);
	// await newProperty.save();

	revalidatePath("/", "layout");
	redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
