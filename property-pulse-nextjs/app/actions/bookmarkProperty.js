"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export default async function bookmarkProperty(propertyId) {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) throw new Error("User ID is required!");

	const { userId } = sessionUser;

	const user = await User.findById(userId);

	let isBookmarked = user.bookmarks.includes(propertyId);

	let message;

	if (isBookmarked) {
		//if already boomarked, then remove bookemark
		user.bookmarks.pull(propertyId);
		message = "Bookmark Removed.";
		isBookmarked = false;
	} else {
		//if not boomarked, then bookemark
		user.bookmarks.push(propertyId);
		message = "Bookmark Added.";
		isBookmarked = true;
	}

	await user.save();
	revalidatePath("/properties/saved", "page");

	return {
		message,
		isBookmarked,
	};
}
