import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    await prisma.videos.create({
      data: {
        title: res.title,
        tag: res.tag,
        description: res.description,
        asset_id: res.asset_id,
        playback_id: res.playback_id,
        duration: res.duration,
        date: new Date(),
        likes: 0,
        views: 0,
        public: res.visibility,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: `Error creating video.` });
  }

  return NextResponse.json({ message: `Video created.` });
}
