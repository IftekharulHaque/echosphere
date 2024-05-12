"use client"

import { useUser } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import "@livekit/components-styles"
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
} from "@livekit/components-react"
import { Track } from "livekit-client"

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser()
  const [token, settoken] = useState("")

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return

    const name = `${user.firstName} ${user.lastName}`
    ;(async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await resp.json()
        settoken(data.token)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [chatId, user?.firstName, user?.lastName])

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      data-lk-theme="default"
      video={video}
      audio={audio}
      connect={true}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
