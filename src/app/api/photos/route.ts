import "server-only";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";
import { Photo } from "../../../../typing";
import { sanityClient } from "@/sanity";

const allPhotoIdsQuery = groq`*[_type == "photo"]{_id}`;
const photosByIdsQuery = (ids: string[]) => groq`*[_id in $ids]`;

type Data = {
  photos: Photo[];
};

export async function GET() {
  try {
    // Step 1: Fetch all photo IDs
    const allPhotoIds: { _id: string }[] = await sanityClient.fetch(allPhotoIdsQuery);

    // Step 2: Select 10 random IDs
    const randomIds = getRandomElements(allPhotoIds.map(photo => photo._id), 10);

    // Step 3: Fetch photos using the selected random IDs
    const data: Data = await sanityClient.fetch(photosByIdsQuery(randomIds), { ids: randomIds });

    return NextResponse.json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching resources data" },
      { status: 500 }
    );
  }
}

// Helper function to select random elements from an array
function getRandomElements(array: string[], count: number): string[] {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
