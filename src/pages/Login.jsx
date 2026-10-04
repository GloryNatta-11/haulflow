import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../services/AuthContext.jsx'
import { Button } from '../components/ui.jsx'
import { homeFor } from '../lib/permissions.js'

export default function Login() {
  const { user, signIn } = useAuth()
  const [loading, setLoading] = useState(null)
  if (user) return <Navigate to={homeFor(user.role)} replace />
  const go = async (role) => { setLoading(role); await signIn(role) }
  const field = 'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm'
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
          <defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#60a5fa" strokeWidth="1" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
          <path d="M-20 520 C 200 380, 320 600, 560 420 S 760 260, 900 300" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 10" />
          <circle cx="560" cy="420" r="8" fill="#3b82f6" />
        </svg>
        <p className="relative text-lg font-semibold tracking-wide">HAULFLOW</p>
        <div className="relative max-w-md">
          <h1 className="text-4xl font-semibold leading-tight">From Dispatch to Done.</h1>
          <p className="mt-4 text-slate-300">One place to manage jobs, drivers, trucks and containers.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); go('Admin') }}>
            <div><label htmlFor="email" className="text-sm font-medium">Email</label><input id="email" type="email" defaultValue="alex@haulflow.demo" className={field} /></div>
            <div><label htmlFor="pw" className="text-sm font-medium">Password</label><input id="pw" type="password" defaultValue="demo-password" className={field} /></div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Remember me</label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <Button className="w-full" type="submit" disabled={!!loading}>{loading === 'Admin' && <Loader2 className="h-4 w-4 animate-spin" />}Sign in</Button>
          </form>
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-sm font-medium">Demo accounts</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['Admin', 'Dispatcher', 'Driver'].map((r) => <Button key={r} variant="secondary" onClick={() => go(r)} disabled={!!loading}>{r}</Button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
