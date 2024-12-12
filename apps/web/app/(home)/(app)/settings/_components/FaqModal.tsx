import { useEffect, useState } from 'react'
import { FaqForm } from './FaqSection'

interface Props {
  defaultFaq: FaqForm | null
  onClose: () => void
  onSubmit: (faq: FaqForm) => void
}

export function FaqModal({ defaultFaq, onSubmit, onClose }: Props) {
  const [faq, setFaq] = useState(defaultFaq)

  useEffect(() => {
    if (defaultFaq != null) {
      setFaq(defaultFaq)
      FaqModal.open()
    } else {
      FaqModal.close()
    }
  }, [defaultFaq])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!faq) return

    setFaq({ ...faq, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!faq) return

    onSubmit(faq)
    ;(document.getElementById('faq-modal') as HTMLDialogElement)?.close()
  }

  return (
    <dialog
      id="faq-modal"
      className="modal"
      onClose={onClose}
    >
      <div className="modal-box flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered"
          placeholder="Enter Question"
          name="question"
          value={faq?.question}
          onChange={handleChange}
        />
        <textarea
          className="textarea textarea-bordered"
          placeholder="Enter Answer"
          name="answer"
          value={faq?.answer}
          onChange={handleChange}
        />
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!faq?.question || !faq?.answer}
          >
            Save
          </button>
          <button
            onClick={FaqModal.close}
            className="btn btn-ghost"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  )
}

FaqModal.id = 'faq-modal'
FaqModal.open = () =>
  (document.getElementById('faq-modal') as HTMLDialogElement)?.showModal()
FaqModal.close = () =>
  (document.getElementById('faq-modal') as HTMLDialogElement)?.close()
