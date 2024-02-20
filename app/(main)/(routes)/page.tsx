import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/ui/modetoggle"

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  )
}
