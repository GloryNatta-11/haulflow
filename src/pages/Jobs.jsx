import { useState } from 'react'
import { Search } from 'lucide-react'
import { Card, PageHeader, JobsTable } from '../components/ui.jsx'
import { jobs } from '../data/mock.js'

const TABS = ['All', 'Scheduled', 'Assigned', 'In Progress', 'Completed']
export default function Jobs() {
  const [tab, setTab] = useState('All')
  const [q, setQ] = useState('')
  const rows = jobs.filter((j) => (tab === 'All' || j.status === tab) && `${j.id} ${j.customer} ${j.driver}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <PageHeader title="Jobs" subtitle="Manage deliveries, pickups and service requests." />
      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-4">
          <div className="flex gap-1 overflow-x-auto">{TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm ${tab === t ? 'bg-blue-50 font-medium text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>{t}</button>
          ))}</div>
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input aria-label="Search jobs" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs" className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm" />
          </div>
        </div>
        <JobsTable rows={rows} />
      </Card>
    </>
  )
}
