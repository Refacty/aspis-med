// context/UserContext.tsx
"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"

// Defina a interface de User conforme necessário
interface User {
  id: number
  name: string
  cpf: string
  whatsapp: string
  email: string
  password: string
  address: string
  registrationDate: string
  role: 'ADMIN' | 'PROFESSIONAL'
}

interface UserContextProps {
  user: User | null
  setUser: (u: User | null) => void
  logout: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoading: true,
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carrega do localStorage uma vez no mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUserState(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const setUser = (newUser: User | null) => {
    setUserState(newUser)
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("user")
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
      <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
        {children}
      </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
