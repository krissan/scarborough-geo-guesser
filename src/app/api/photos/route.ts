import "server-only";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";
import { Photo } from "../../../../typing";
import { sanityClient } from "@/sanity";
export const dynamic = 'force-dynamic';

const allPhotoIdsQuery = groq`*[_type == "photo"]{_id}`;
const photosByIdsQuery = (ids: string[]) => groq`*[_id in $ids]`; // eslint-disable-line @typescript-eslint/no-unused-vars

type Data = {
  photos: Photo[];
};

// Get 10 random photo questions
export async function GET() {
  try {
    // fetch all photo IDs
    const allPhotoIds: { _id: string }[] = await sanityClient.fetch(allPhotoIdsQuery, undefined,  { cache: 'no-store' });

    // select 10 random IDs
    const randomIds = getRandomElements(allPhotoIds.map(photo => photo._id), 10);

    // fetch photos using the selected random IDs
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