import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new Response("unauthorized", { status: 401 });
        }
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!serverId) {
            return new Response("serverId is required", { status: 400 });
        }
        if (!params.channelId) {
            return new Response("channelId is required", { status: 400 });
        }
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in:
                                [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general"
                        }
                    },
                },
            },
        });
    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error);
        return new NextResponse("internal error", { status: 500 });

    }
}