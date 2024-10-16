import "server-only";

import { groq } from "next-sanity";
import { NextResponse } from "next/server";
import { Answer } from "../../../../typing";
import { sanityClient } from "@/sanity";

const query = groq`*[_type == "answer"]`;

type Data = {
  answers: Answer[];
};

export async function GET() {
  try {
    const data: Data = await sanityClient.fetch(query,undefined, { cache: 'no-store' });
    return NextResponse.json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching resources data" },
      { status: 500 }
    );
  }
}