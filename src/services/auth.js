// MOCK auth service. Replace with a Firebase implementation exposing the same methods:
// signInDemo -> signInWithEmailAndPassword, signOut -> signOut(auth).
// In production the role comes from a server-set custom claim, never from the client.
const DEMO_USERS = {
  Admin: { id: 'u1', name: 'Alex Morgan', title: 'Operations Manager', role: 'Admin' },
  Dispatcher: { id: 'u2', name: 'Sarah Lee', title: 'Dispatcher', role: 'Dispatcher' },
  Manager: { id: 'u3', name: 'Jordan Reyes', title: 'General Manager', role: 'Manager' },
  Driver: { id: 'u4', name: 'Mike Johnson', title: 'Driver', role: 'Driver' },
}
const KEY = 'haulflow.session'
export const authService = {
  getSession() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) } catch { return null }
  },
  async signInDemo(role) {
    await new Promise((r) => setTimeout(r, 350))
    const user = DEMO_USERS[role] ?? DEMO_USERS.Admin
    sessionStorage.setItem(KEY, JSON.stringify(user))
    return user
  },
  async signOut() { sessionStorage.removeItem(KEY) },
}
