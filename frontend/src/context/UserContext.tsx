"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"

// Ajuste conforme os campos que realmente guarda:
interface User {
  id: number
  name: string
  cpf: string
  whatsapp: string
  email: string
  password: string
  address: string
  registrationDate: string
  role: string // "ADMIN", "PROFESSIONAL", etc.
}

interface UserContextProps {
  user: User | null
  setUser: (u: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)

  // Carrega do localStorage uma vez no mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUserState(JSON.parse(storedUser))
    }
  }, [])

  // Função para atualizar user no estado e no localStorage
  const setUser = (newUser: User | null) => {
    setUserState(newUser)
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("user")
    }
  }

  // Desloga removendo do estado + localStorage
  const logout = () => {
    setUser(null)
  }

  return (
      <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
      </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
