import { FaBars } from 'react-icons/fa6'

export default function Header({ onDisableChat }) {
  const handleDropDownClick = () => {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }
  }

  return (
    <div className="flex w-full justify-end gap-2 p-4">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
        >
          <FaBars className="text-xl" />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow"
        >
          <li>
            <button
              onClick={() => {
                handleDropDownClick()
                onDisableChat()
              }}
            >
              Start a New Conversation
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
