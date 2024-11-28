import LogoutButton from './_components/logout-button'

export default function HomeLayout({ children }) {
  return (
    <div className="container mx-auto px-6">
      <div className="navbar">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <span className="text-xl font-bold">Supporty</span>
        </div>
        <div className="navbar-end">
          <LogoutButton />
        </div>
      </div>
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  )
}
