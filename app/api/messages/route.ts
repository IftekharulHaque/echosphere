import { currentProfile } from "@/lib/current-profile"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const profile = await currentProfile()

    } catch (error) {
        console.log("[Messages_get]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}