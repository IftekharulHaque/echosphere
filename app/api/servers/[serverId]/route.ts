import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const Profile = await currentProfile();
        const { name, imageUrl } = await req.json();
        if (!Profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const Server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: Profile.id,
            },
            data: {
                name,
                imageUrl,

            }


        })
        return NextResponse.json(Server);

    } catch (error) {
        console.log("[Server_ID_PATCH_Error]", error);
        return new NextResponse("Internal error", { status: 500 });
    }

}