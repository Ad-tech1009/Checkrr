// AuthContext.tsx
import { createContext, useContext, useState } from "react"

type User = { email: string, name:string }

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isLoggedin: boolean
  setIsLoggedin: (status: boolean) => void
}

// 1. Create context with a default shape
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoggedin: false,
  setIsLoggedin: () => {}
})

// 2. AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedin, setIsLoggedin] = useState(false)

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedin, setIsLoggedin }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Custom hook to use it
export function useAuth() {
  return useContext(AuthContext)
}