// src/pages/Register.tsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FIREBASE_AUTH } from "../constants/firebaseConfig"

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, formData.email, formData.password)
      const user = userCredential.user

      // Update profile (name + avatar)
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.avatar || "",
      })

      navigate("/dashboard") // redirect after success
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Register</h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL (optional)"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-600 text-white px-4 py-2 font-medium hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 dark:text-teal-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
