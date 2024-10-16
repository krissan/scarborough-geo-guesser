import { createClient } from "next-sanity";

const config = {
	dataset: process.env.NEXT_PUBLIC_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
	useCdn: false
};

export const sanityClient = createClient(config);