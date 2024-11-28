export default function InputMessage({ children }) {
  return (
    <div className="flex w-full justify-end pl-40">
      <div className="bg-primary text-primary-content whitespace-pre-wrap rounded-xl p-3">
        {children}
      </div>
    </div>
  )
}
