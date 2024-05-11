import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { DirectMessage } from "@prisma/client"
import { NextResponse } from "next/server"


const Message_Batch = 10
export async function GET(req: Request) {
    try {
        const profile = await currentProfile()
        const { searchParams } = new URL(req.url)

        const cursor = searchParams.get("cursor")
        const conversationId = searchParams.get("conversationId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!conversationId) {
            return new NextResponse("conversationId missing", { status: 400 })
        }
        let messages: DirectMessage[] = []
        if (cursor) {
            messages = await db.directMessage.findMany({
                take: Message_Batch,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true

                        }
                    }
                },
                orderBy: {
                    ceatedAt: "desc"
                }
            })
        } else {
            messages = await db.directMessage.findMany({
                take: Message_Batch,
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    ceatedAt: "desc"
                },

            })
        }
        let nextCursor = null
        if (messages.length === Message_Batch) {
            nextCursor = messages[messages.length - 1].id
        }
        return NextResponse.json({
            items: messages,
            nextCursor
        })
    } catch (error) {
        console.log("[Direct_Messages_get]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}