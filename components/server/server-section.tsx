"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import { ChannelType, MemberRole } from "@prisma/client"
import { Server } from "http"
import { ActionTooltip } from "../ui/action-tooltip"
import { PlusIcon, Settings } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"

interface ServerSectionProps {
  label: string
  role?: MemberRole
  sectionType: "channels" | "members"
  channelType: ChannelType
  server: ServerWithMembersWithProfiles
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal()
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top" align="center">
          <button
            onClick={() => onOpen("createChannel")}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip align="center" label="Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}

export default ServerSection
