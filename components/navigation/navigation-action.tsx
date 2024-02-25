"use client"

import { Plus } from "lucide-react"
import { ActionTooltip } from "@/components/ui/action-tooltip"
const NavigationAction = () => {
  return (
    <div>
      <button className="group flex items-center">
        <div className="flex mx-3 p-2 rounded-full group-hover:transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 ">
          <Plus
            className="group-hover:text-white transition text-emerald-500 "
            size={25}
          />
        </div>
      </button>
    </div>
  )
}

export default NavigationAction
