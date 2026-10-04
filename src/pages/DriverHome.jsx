import { useState } from 'react'
import { Button, Card, StatusBadge } from '../components/ui.jsx'
import { useToast } from '../components/Toast.jsx'
import { useAuth } from '../services/AuthContext.jsx'
import { jobs } from '../data/mock.js'

const NEXT = { Scheduled: ['Assigned', 'Start Job'], Assigned: ['In Progress', 'Arrived'], 'In Progress': ['Completed', 'Complete Job'] }
export default function DriverHome() {
  const toast = useToast()
  const { user } = useAuth()
  const [list, setList] = useState(() => jobs.filter((j) => j.driver === user.name))
  const advance = (id) => {
    setList((l) => l.map((j) => (j.id === id && NEXT[j.status] ? { ...j, status: NEXT[j.status][0] } : j)))
    toast('Status updated')
  }
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Good morning, {user.name.split(' ')[0]}</h1>
      <p className="mb-5 mt-1 text-sm text-slate-500">Today's jobs</p>
      <div className="space-y-4">
        {list.map((j) => (
          <Card key={j.id} className="p-5">
            <div className="flex items-center justify-between"><span className="font-semibold text-blue-700">{j.id}</span><StatusBadge status={j.status} /></div>
            <p className="mt-2 font-medium">{j.customer}</p>
            <p className="text-sm text-slate-500">{j.service} · {j.container} · {j.time}</p>
            <p className="text-sm text-slate-500">{j.location} · Truck {j.truck}</p>
            {NEXT[j.status] ? <Button className="mt-4 min-h-12 w-full text-base" onClick={() => advance(j.id)}>{NEXT[j.status][1]}</Button> : <p className="mt-4 text-sm font-medium text-emerald-600">Job complete</p>}
          </Card>
        ))}
      </div>
    </div>
  )
}
