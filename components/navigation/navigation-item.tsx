"use client"

import { cn } from "@/lib/utils"
import { ActionTooltip } from "../ui/action-tooltip"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"

interface NavigationItemProps {
  id: string
  name: string
  imageUrl: string
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const params = useParams()
  const router = useRouter()

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <ActionTooltip align="center" label={name} side="right">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px] ",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-full group-hover:rounded-full transition-all overflow-hidden",
            params?.serverId === id && "bg-primary/10 text-primary rounded-full"
          )}
        >
          <Image alt="Channel" src={imageUrl} fill />
        </div>
      </button>
    </ActionTooltip>
  )
}

export default NavigationItem
