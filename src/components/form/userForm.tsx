// src/pages/UserForm.tsx
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile, updatePassword, } from "firebase/auth"
import { FIREBASE_AUTH } from "../../constants/path"

type UserFormProps = {
  isEdit?: boolean
}

export default function UserForm({ isEdit = false }: UserFormProps) {
  const navigate = useNavigate()
  const currentUser = FIREBASE_AUTH.currentUser

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isEdit && currentUser) {
      setFormData({
        name: currentUser.displayName || "",
        email: currentUser.email || "",
        avatar: currentUser.photoURL || "",
        password: "",
        confirmPassword: "",
      })
    }
  }, [isEdit, currentUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      if (isEdit && currentUser) {
        // Update existing user
        await updateProfile(currentUser, {
          displayName: formData.name,
          photoURL: formData.avatar,
        })

        if (formData.password) {
          await updatePassword(currentUser, formData.password)
        }
      } else {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          formData.email,
          formData.password
        )
        const user = userCredential.user
        await updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.avatar,
        })
      }
      navigate("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          {isEdit ? "Update Profile" : "Register"}
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          {!isEdit && (
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          )}

          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL (optional)"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <input
            type="password"
            name="password"
            placeholder={isEdit ? "New Password (leave empty to keep current)" : "Password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            {...(!isEdit && { required: true })}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            {...(!isEdit && { required: true })}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-600 text-white px-4 py-2 font-medium hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? (isEdit ? "Updating..." : "Registering...") : isEdit ? "Update" : "Register"}
          </button>
        </form>

        {!isEdit && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-600 dark:text-teal-400 hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
