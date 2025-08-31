import { useState } from "react"
import { AuthProvider, RouterComponent, type componentProps } from "./constants/path"
type Props = {}


export default function App({ }: Props) {
  const [users, setUsers] = useState<componentProps['userProps'][]>([
    {
      name: "Ken",
      email: "ken@email.dev",
      userType: "default",
      avatar: "",
      password:"123456"
    }
  ])
  const [user, setUser] = useState<componentProps['userProps'] | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const value = {
    users, setUsers, user, setUser, isAuthenticated, setIsAuthenticated
  }
  return (
    <div>
      <AuthProvider value={value}>
        <RouterComponent />
      </AuthProvider>

    </div>

  )
}