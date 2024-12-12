import { Faq } from "@/types/project";

interface Props {
  faq: Faq[];
  onSelect: (faq: Faq) => void;
}
export function FaqList({ faq, onSelect }: Props) {
  return (
    <div className="flex w-full gap-2 overflow-y-auto pl-6">
      {faq.map((faq) => (
        <button
          className="
            cursor-pointer rounded-3xl bg-gray-100 px-4 py-3 text-sm text-gray-800
            transition-colors hover:bg-blue-200 active:bg-blue-300 border border-gray-400
            dark:bg-gray-700 dark:text-gray-200
            dark:hover:bg-blue-500 dark:active:bg-blue-600
          "
          key={faq.id}
          onClick={() => onSelect(faq)}
        >
          {faq.question}
        </button>
      ))}
    </div>
  );
}
