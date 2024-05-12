"use client"
import { Video, VideoOff } from "lucide-react"
import qs from "query-string"
import { ActionTooltip } from "../ui/action-tooltip"
import { Icon } from "@radix-ui/react-select"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const ChatVideoButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isVideo = searchParams?.get("video")
  const Icon = isVideo ? VideoOff : Video
  const toolTipLabel = isVideo ? "End video call" : "Start video call"

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : "true",
        },
      },
      { skipNull: true }
    )

    router.push(url)
  }

  return (
    <ActionTooltip side="bottom" label={toolTipLabel} align="center">
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-50 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  )
}

export default ChatVideoButton
