export default function InputMessage({ children }) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-blue-300 text-gray-800">{children}</div>
    </div>
  )
}
