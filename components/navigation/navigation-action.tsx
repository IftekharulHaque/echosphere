"use client"

import { Plus } from "lucide-react"
import { ActionTooltip } from "@/components/ui/action-tooltip"
const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip label="Add a server" align="center" side="right">
        <button className="group flex items-center">
          <div className="flex mx-3 p-2 rounded-full group-hover:transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 ">
            <Plus
              className="group-hover:text-white transition text-emerald-500 "
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}

export default NavigationAction
