import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { TagComponent, useAuth } from "../../constants/path"

export default function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-lg">
            B
          </h1>
          <h1 className="font-bold text-xl text-gray-900 dark:text-white">BlogSite</h1>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4 relative">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 p-1 pr-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {user?.email}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    {user?.email && <TagComponent tag={user.email} />}
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-white"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-white"
        >
          <span className="sr-only">Toggle menu</span>
          {!menuOpen ? <Menu /> : <X />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 shadow">
          <div className="flex flex-col gap-2 mt-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-teal-600 text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {user?.name}
                    </span>
                    {user?.email && <TagComponent tag={user.email} />}
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block rounded-md bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="block rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-white"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
