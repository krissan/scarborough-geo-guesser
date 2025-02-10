import "server-only";

import { groq } from "next-sanity";
import { NextResponse } from "next/server";
import { Answer } from "../../../../typing";
import { sanityClient } from "@/sanity";

const query = groq`*[_type == "answer"]`;

export async function GET() {
  try {
    const data: Answer[] = await sanityClient.fetch(query);
    const answers = data.map((answer) => {return {id: answer._id, text: answer.text}});
    return NextResponse.json(answers);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching resources data" },
      { status: 500 }
    );
  }
}