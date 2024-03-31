interface ChatWelcomeProps {
  type: "channel" | "conversation"
  name: string
}
const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return <div>Welcome</div>
}

export default ChatWelcome
