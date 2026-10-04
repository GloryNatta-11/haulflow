import { useNavigate } from 'react-router-dom'
import { Plus, CalendarClock, Building2, UserPlus, Truck } from 'lucide-react'
import { Button, Card, StatCard, JobsTable } from '../components/ui.jsx'
import { useToast } from '../components/Toast.jsx'
import { useAuth } from '../services/AuthContext.jsx'
import { can } from '../lib/permissions.js'
import { jobs, metrics, activity, STATUSES } from '../data/mock.js'

export default function Dashboard() {
  const toast = useToast()
  const navigate = useNavigate()
  const { user, role } = useAuth()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const actions = [
    { label: 'Create Job', icon: Plus, perm: 'jobs.create' }, { label: 'Schedule Pickup', icon: CalendarClock, perm: 'jobs.create' },
    { label: 'Add Customer', icon: Building2, perm: 'ops.view' }, { label: 'Add Driver', icon: UserPlus, perm: 'ops.view' }, { label: 'Add Truck', icon: Truck, perm: 'ops.view' },
  ].filter((a) => can(role, a.perm))

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{greeting}, {user.name.split(' ')[0]}</h1>
          <p className="mt-1 text-sm text-slate-500">Here's what's happening with your operation today. {today}</p>
        </div>
        {can(role, 'jobs.create') && <Button onClick={() => toast('Job created. The full form arrives in the next phase.')}><Plus className="h-4 w-4" />Create Job</Button>}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">{metrics.map((m) => <StatCard key={m.label} {...m} />)}</div>

      <Card className="mt-6 p-5">
        <h2 className="font-semibold">Today's operations</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATUSES.map((s, i) => (
            <div key={s} className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{s}</p>
              <p className="mt-1 text-2xl font-semibold">{[11, 6, 8, 5][i]}</p>
              <div className="mt-3 h-1.5 rounded-full bg-slate-200"><div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${[45, 25, 33, 20][i]}%` }} /></div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <div className="flex items-center justify-between p-5 pb-2"><h2 className="font-semibold">Today's jobs</h2><Button variant="ghost" onClick={() => navigate('/jobs')}>View all</Button></div>
          <JobsTable rows={jobs} onRowClick={(j) => toast(`${j.id} details arrive in the next phase`, 'info')} />
        </Card>
        <div className="space-y-6">
          {actions.length > 0 && (
            <Card className="p-5">
              <h2 className="font-semibold">Quick actions</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {actions.map((a) => <Button key={a.label} variant="secondary" className="justify-start px-3" onClick={() => toast(`${a.label} arrives in a later phase`, 'info')}><a.icon className="h-4 w-4 text-blue-600" />{a.label}</Button>)}
              </div>
            </Card>
          )}
          <Card className="p-5">
            <h2 className="font-semibold">Live activity</h2>
            <ul className="mt-3 space-y-4">
              {activity.map((a) => (
                <li key={a.time + a.user} className="flex gap-3 text-sm">
                  <span className="w-16 shrink-0 text-xs text-slate-400">{a.time}</span>
                  <p><span className="font-medium">{a.user}</span> {a.text}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
