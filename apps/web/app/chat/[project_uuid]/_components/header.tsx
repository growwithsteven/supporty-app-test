import { ProjectSettings } from "@/types/project";
import { FaBars } from "react-icons/fa6";

export default function Header({
  opening_hours,
  onDisableChat,
}: Pick<ProjectSettings, "opening_hours"> & {
  onDisableChat: () => void;
}) {
  const handleDropDownClick = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="flex w-full items-center justify-between px-4 py-2 border-b border-gray-400 dark:border-gray-600">
      <div className="flex-1" />
      <div className="flex-1 text-center text-sm text-gray-400">
        {opening_hours != null ? (
          <>
            <span className="text-xs">Opening Hours</span>
            <br />
            {opening_hours.open} - {opening_hours.close}
          </>
        ) : (
          <span>Available 24/7</span>
        )}
      </div>
      <div className="flex flex-1 justify-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FaBars className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow"
          >
            <li>
              <button
                onClick={() => {
                  handleDropDownClick();
                  onDisableChat();
                }}
              >
                Start a New Conversation
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
