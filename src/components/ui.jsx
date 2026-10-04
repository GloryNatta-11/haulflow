import { Inbox } from 'lucide-react'

export function Button({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
  }
  return <button className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`} {...props} />
}

export const Card = ({ className = '', children }) => (
  <section className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>
)

const BADGE = {
  Scheduled: 'bg-slate-100 text-slate-700',
  Assigned: 'bg-blue-50 text-blue-700',
  'In Progress': 'bg-amber-50 text-amber-700',
  Completed: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-red-50 text-red-700',
}
export const StatusBadge = ({ status }) => (
  <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE[status] ?? BADGE.Scheduled}`}>{status}</span>
)

export const StatCard = ({ label, value, note }) => (
  <Card className="p-4">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
    {note && <p className="mt-1 text-xs font-medium text-emerald-600">{note}</p>}
  </Card>
)

export const EmptyState = ({ title, hint }) => (
  <div className="flex flex-col items-center py-16 text-center">
    <Inbox className="h-10 w-10 text-slate-300" />
    <p className="mt-3 font-medium">{title}</p>
    <p className="mt-1 text-sm text-slate-500">{hint}</p>
  </div>
)

export const PageHeader = ({ title, subtitle, action }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
    {action}
  </div>
)

export function JobsTable({ rows, onRowClick }) {
  if (!rows.length) return <EmptyState title="No jobs found" hint="Try adjusting your filters or create a new job." />
  const heads = ['Job ID', 'Customer', 'Location', 'Service', 'Container', 'Truck', 'Driver', 'Time', 'Status']
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="border-b border-slate-200 text-xs text-slate-500">
          <tr>{heads.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((j) => (
            <tr key={j.id} onClick={() => onRowClick?.(j)} className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-blue-700">{j.id}</td>
              <td className="px-4 py-3">{j.customer}</td>
              <td className="px-4 py-3 text-slate-600">{j.location}</td>
              <td className="px-4 py-3">{j.service}</td>
              <td className="px-4 py-3">{j.container}</td>
              <td className="px-4 py-3">{j.truck}</td>
              <td className="px-4 py-3">{j.driver}</td>
              <td className="px-4 py-3">{j.time}</td>
              <td className="px-4 py-3"><StatusBadge status={j.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
