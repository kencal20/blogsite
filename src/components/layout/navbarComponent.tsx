import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "History", href: "#" },
    { name: "Services", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Blog", href: "#" },
  ]

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

        {/* Desktop Navigation */}
        <nav aria-label="Global" className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition"
                  to={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
            to="#"
          >
            Login
          </Link>

          <Link
            className="rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-white"
            to="#"
          >
            Register
          </Link>
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
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="block py-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition"
                  to={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 mt-4">
            <Link
              className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
              to="#"
            >
              Login
            </Link>

            <Link
              className="block rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-white"
              to="#"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
