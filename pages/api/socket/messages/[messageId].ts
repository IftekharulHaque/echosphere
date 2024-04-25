import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    try {
        const profile = await currentProfilePages(req);
        if (!profile) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { messageId, serverId, channelId } = req.query;
        const { content } = req.body
        if (!messageId || !serverId || !channelId) {
            return res.status(400).json({ message: "Bad request" });
        }
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id,
                    },
                },
            },
            include: {
                members: true,
            }
        }
        );
        if (!server) {
            return res.status(404).json({ message: "Server not found" });
        }
        const channel = db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: server.id as string,
            },
        });
        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }
        const member = server.members.find((member) => member.profileId === profile.id);
        if (!member) {
            return res.status(401).json({ message: "member not found" });
        }

        let message = await db.message.findFirst({
            where: {
                id: messageId as string,
                channelId: channelId as string,
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }

        })
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        const isMessageOwner = message.memberId === member.id;
        const isModerator = member.role === MemberRole.MODERATOR;
        const isAdmin = member.role === MemberRole.ADMIN;
        const canModify = isMessageOwner || isModerator || isAdmin;
        if (!canModify) {
            return res.status(401).json({ message: "Unauthorised" });
        }
        if (req.method === "DELETE") {
            message = await db.message.update({
                where: {
                    id: messageId as string,
                },
                data: {
                    deleted: true,
                    fileUrl: null,
                    content: "Message deleted",
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }
            });
            return res.status(200).json({ message: "Message deleted" });
        }


    } catch (error) {
        console.log("Message ID", error);
        return res.status(500).json({ message: "Internal error" });
    }
}