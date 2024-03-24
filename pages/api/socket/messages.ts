import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {

    } catch (error) {
        console.log("Messages_POST", error);
        return res.status(500).json({ message: "Internal error" })

    }
}