import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './services/AuthContext.jsx'
import { can, homeFor } from './lib/permissions.js'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Jobs from './pages/Jobs.jsx'
import DriverHome from './pages/DriverHome.jsx'
import Placeholder from './pages/Placeholder.jsx'

// Route guard. Remember: this is UX only; Firestore Security Rules do the real enforcement.
function Guard({ perm, children }) {
  const { user, role } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!can(role, perm)) return <Navigate to={homeFor(role)} replace />
  return children
}
const placeholders = [
  ['schedule', 'Schedule', 'ops.view'], ['customers', 'Customers', 'ops.view'], ['drivers', 'Drivers', 'ops.view'],
  ['trucks', 'Trucks', 'ops.view'], ['containers', 'Containers', 'ops.view'], ['activity', 'Activity', 'activity.view'],
  ['reports', 'Reports', 'reports.view'], ['settings', 'Settings', 'settings.view'],
]
export default function App() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={user ? <Layout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<Guard perm="dashboard.view"><Dashboard /></Guard>} />
        <Route path="/jobs" element={<Guard perm="jobs.view"><Jobs /></Guard>} />
        <Route path="/driver" element={<Guard perm="driver.app"><DriverHome /></Guard>} />
        {placeholders.map(([p, t, perm]) => <Route key={p} path={`/${p}`} element={<Guard perm={perm}><Placeholder title={t} /></Guard>} />)}
      </Route>
      <Route path="*" element={<Navigate to={user ? homeFor(user.role) : '/login'} replace />} />
    </Routes>
  )
}
