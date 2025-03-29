"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface User {
  id: number
  name: string
  cpf: string
  whatsapp: string
  email: string
  password: string
  address: string
  registrationDate: string
  role: string // "ADMIN" ou "USER", etc.
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

  const setUser = (newUser: User | null) => {
    setUserState(newUser)
  }

  const logout = () => {
    setUserState(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext(): UserContextProps {
  return useContext(UserContext)
}
