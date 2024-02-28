export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {

    } catch (error) {
        console.log("[SERVER_ID]", error);
        return new Response(null, { status: 500 });

    }
}