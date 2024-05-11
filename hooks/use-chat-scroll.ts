
import { useEffect, useState } from "react"

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>
    bottomRef: React.RefObject<HTMLDivElement>
    shouldLoadMore: boolean
    loadMore: () => void
    count: number
}


export const useChatScroll = ({ chatRef, bottomRef, count, loadMore, shouldLoadMore }: ChatScrollProps) => {
    const [hasInitialized, sethasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop
            if (scrollTop === 0 && shouldLoadMore) {
                loadMore()
            }
        }

        topDiv?.addEventListener("scroll", handleScroll)
        return () => {
            topDiv?.removeEventListener("scroll", handleScroll)
        }

    }, [bottomRef, chatRef, count, loadMore, shouldLoadMore])

    useEffect(() => {
        const bottomDiv = bottomRef?.current
        const topDiv = chatRef.current

        const shouldAutoScroll = () => {

            if (!hasInitialized && bottomDiv) {
                sethasInitialized(true)
                return true
            }
            if (!topDiv) {
                return false
            }
            const distanceToBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
            return distanceToBottom <= 100
        }

        if (shouldAutoScroll()) {
            console.log(hasInitialized)
            setTimeout(() => {
                bottomRef?.current?.scrollIntoView({ behavior: "smooth" })
            }, 100)
        }

    }, [bottomRef, chatRef, hasInitialized])


}