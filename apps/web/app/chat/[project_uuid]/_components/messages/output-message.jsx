export default function InputMessage({ children }) {
  return (
    <div className="flex w-full pr-10">
      <div className="bg-base-200 text-base-content whitespace-pre-wrap rounded-xl p-3">
        {children}
      </div>
    </div>
  )
}
