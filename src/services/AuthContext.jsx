import { createContext, useContext, useState } from 'react'
import { authService } from './auth.js'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getSession())
  const signIn = async (role) => setUser(await authService.signInDemo(role))
  const signOut = async () => { await authService.signOut(); setUser(null) }
  return <AuthContext.Provider value={{ user, role: user?.role, signIn, signOut }}>{children}</AuthContext.Provider>
}
