import { Faq } from '@/types/project'
import { useState } from 'react'
import { FaqModal } from './FaqModal'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { SetOptional } from '@/types/utils'

export type FaqForm = SetOptional<Faq, 'id'>

export function FaqSection({
  value,
  onChange,
}: {
  value: Faq[]
  onChange: (faq: Faq[]) => void
}) {
  const [editingFaq, setEditingFaq] = useState<FaqForm | null>(null)

  const openAddModal = () => {
    setEditingFaq({ question: '', answer: '' })
  }

  const openEditModal = (faq: Faq) => {
    setEditingFaq(faq)
  }

  const handleModalSubmit = (faq: FaqForm) => {
    const isEditing = faq.id != null

    if (isEditing) {
      const updatedFaqs = value.map((ele) =>
        ele.id === faq.id ? faq : ele,
      ) as Faq[]
      onChange(updatedFaqs)
    } else {
      const newFaq = { ...faq, id: crypto.randomUUID() }
      onChange([...value, newFaq])
    }
  }

  const deleteFaq = (faq: Faq) => {
    const updatedFaqs = value.filter((f) => f.id !== faq.id)
    onChange(updatedFaqs)
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={openAddModal}
        className="btn btn-primary w-fit self-center"
      >
        Add FAQ
      </button>
      <FaqModal
        defaultFaq={editingFaq}
        onSubmit={handleModalSubmit}
        onClose={() => setEditingFaq(null)}
      />
      {value.map((faq, index) => (
        <div
          key={faq.id}
          className="bg-base-200 collapse-arrow group collapse relative"
        >
          <input
            type="radio"
            name="faq-accordion"
            defaultChecked={index === 0}
          />
          <div className="collapse-title text-left text-xl font-medium">
            {faq.question}
          </div>
          <div className="collapse-content text-left text-gray-300">
            <p>{faq.answer}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-ghost btn-sm text-gray-400 hover:text-gray-100"
                onClick={() => openEditModal(faq)}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-ghost btn-sm text-gray-400 hover:text-gray-100"
                onClick={() => deleteFaq(faq)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
