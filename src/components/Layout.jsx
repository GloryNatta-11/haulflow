import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Briefcase, CalendarDays, Building2, Users, Truck, Package, Activity, BarChart3, Settings, Menu, PanelLeftClose, PanelLeftOpen, LogOut, ListChecks } from 'lucide-react'
import { useAuth } from '../services/AuthContext.jsx'
import { can, ROLES, homeFor } from '../lib/permissions.js'

const NAV = [
  { to: '/driver', label: "Today's Jobs", icon: ListChecks, perm: 'driver.app' },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, perm: 'dashboard.view' },
  { to: '/jobs', label: 'Jobs', icon: Briefcase, perm: 'jobs.view' },
  { to: '/schedule', label: 'Schedule', icon: CalendarDays, perm: 'ops.view' },
  { to: '/customers', label: 'Customers', icon: Building2, perm: 'ops.view' },
  { to: '/drivers', label: 'Drivers', icon: Users, perm: 'ops.view' },
  { to: '/trucks', label: 'Trucks', icon: Truck, perm: 'ops.view' },
  { to: '/containers', label: 'Containers', icon: Package, perm: 'ops.view' },
  { to: '/activity', label: 'Activity', icon: Activity, perm: 'activity.view' },
  { to: '/reports', label: 'Reports', icon: BarChart3, perm: 'reports.view' },
]
const ADMIN_NAV = [{ to: '/settings', label: 'Settings', icon: Settings, perm: 'settings.view' }]

export default function Layout() {
  const { user, role, signIn, signOut } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)

  const link = (item, showLabel) => (
    <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} title={item.label}
      className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
      <item.icon className="h-5 w-5 shrink-0" />{showLabel && item.label}
    </NavLink>
  )
  const sidebar = (showLabel) => (
    <div className="flex h-full flex-col bg-navy p-3 text-white">
      <div className="mb-6 flex items-center gap-2 px-2 pt-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 font-bold">H</div>
        {showLabel && <span className="font-semibold tracking-wide">HAULFLOW</span>}
      </div>
      <nav className="flex-1 space-y-1" aria-label="Main">
        {NAV.filter((n) => can(role, n.perm)).map((n) => link(n, showLabel))}
        {can(role, 'settings.view') && (
          <>
            {showLabel && <p className="px-3 pb-1 pt-5 text-xs text-slate-400">Administration</p>}
            {ADMIN_NAV.map((n) => link(n, showLabel))}
          </>
        )}
      </nav>
      <div className="flex items-center gap-3 border-t border-white/10 px-2 pt-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-medium">{user.name[0]}</div>
        {showLabel && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.title}</p>
          </div>
        )}
        {showLabel && <button onClick={signOut} aria-label="Sign out" className="rounded p-1 text-slate-400 hover:text-white"><LogOut className="h-4 w-4" /></button>}
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      <aside className={`sticky top-0 hidden h-screen shrink-0 transition-[width] lg:block ${collapsed ? 'w-[72px]' : 'w-64'}`}>{sidebar(!collapsed)}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">{sidebar(true)}</div>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur">
          <button className="rounded p-2 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <button className="hidden rounded p-2 hover:bg-slate-100 lg:block" onClick={() => setCollapsed((c) => !c)} aria-label="Toggle sidebar">
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
          <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
            <label htmlFor="demo-role">Demo mode</label>
            <select id="demo-role" value={role} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800"
              onChange={async (e) => { await signIn(e.target.value); navigate(homeFor(e.target.value)) }}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
