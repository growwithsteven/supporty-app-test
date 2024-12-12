import { Faq } from '@/types/project'

interface Props {
  faq: Faq[]
  onSelect: (faq: Faq) => void
}
export function FaqList({ faq, onSelect }: Props) {
  return (
    <div className="flex w-full gap-2 overflow-y-auto pl-6">
      {faq.map((faq) => (
        <button
          className="cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-green-200 active:bg-green-300"
          key={faq.id}
          onClick={() => onSelect(faq)}
        >
          {faq.question}
        </button>
      ))}
    </div>
  )
}
