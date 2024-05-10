import { useEffect, useState } from "react"

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>
    buttomRef: React.RefObject<HTMLDivElement>
    shouldLoadMore: boolean
    loadMore: () => void
    count: number
}


export const useChatScroll = ({ chatRef, buttomRef, count, loadMore, shouldLoadMore }: ChatScrollProps) => {
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

    }, [buttomRef, chatRef, count, loadMore, shouldLoadMore])
}