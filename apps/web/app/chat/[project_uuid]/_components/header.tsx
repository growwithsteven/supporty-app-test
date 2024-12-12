import { ProjectSettings } from '@/types/project'
import { FaBars } from 'react-icons/fa6'

export default function Header({
  operating_hours,
  onDisableChat,
}: Pick<ProjectSettings, 'operating_hours'> & {
  onDisableChat: () => void
}) {
  const handleDropDownClick = () => {
    const elem = document.activeElement as HTMLElement
    if (elem) {
      elem.blur()
    }
  }

  const formatOperatingHours = (hours: { open: string; close: string }) => {
    return `Operating Hours: ${hours.open} - ${hours.close}`
  }

  return (
    <div className="flex w-full items-center justify-between p-4">
      <div className="flex-1" />
      <div className="flex-1 text-center text-sm text-gray-300">
        {operating_hours != null ? (
          <span>{formatOperatingHours(operating_hours)}</span>
        ) : (
          <span>Available 24/7</span>
        )}
      </div>
      <div className="flex flex-1 justify-end">
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
    </div>
  )
}
