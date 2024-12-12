export default function OutputMessage({ children }) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-gray-300 text-gray-800">{children}</div>
    </div>
  )
}
