import { useState } from "react";
import { useAuth } from "../constants/path";
import type { componentProps } from "../constants/path";

export default function LoginPage() {
  const [status, setStatus] = useState<{ type: "error" | "success" | null; message: string }>({
    type: null,
    message: ""
  });

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { users, setUser, setIsAuthenticated } = useAuth();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      return setStatus({ type: "error", message: "Fill all fields to login" });
    }

    const user = users.find(
      (u: componentProps["userProps"]) => u.email === email && u.password === password
    );

    if (!user) {
      setStatus({ type: "error", message: "Wrong credentials" });
      setForm((prev) => ({ ...prev, password: "" }));
      return;
    }

    setUser(user);
    setIsAuthenticated(true);
    setForm({ email: "", password: "" })

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">My Blog</h1>
          <p className="text-sm text-gray-500">Login to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={form.email}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          {status.type && (
            <p className={`text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
              {status.message}
            </p>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300" />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
