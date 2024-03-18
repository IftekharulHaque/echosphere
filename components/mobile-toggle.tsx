import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import NavigationSidebar from "./navigation/navigation-sidebar"
import ServerSidebar from "./server/server-sidebar"

const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant={"ghost"} size="icon">
          <Menu className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 flex gap-0" side={"left"}>
        <div className="w-[72px] ">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileToggle
