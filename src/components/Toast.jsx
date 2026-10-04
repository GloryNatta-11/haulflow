import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'

const ToastContext = createContext(null)
export const useToast = () => useContext(ToastContext)
const ICONS = { success: CheckCircle2, error: AlertCircle, info: Info }
const TONES = { success: 'text-emerald-600', error: 'text-red-600', info: 'text-blue-600' }

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const toast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setItems((list) => [...list, { id, message, type }])
    setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 3500)
  }, [])
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2" role="status" aria-live="polite">
        {items.map((t) => {
          const Icon = ICONS[t.type]
          return (
            <div key={t.id} className="toast-in flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-lg">
              <Icon className={`h-5 w-5 ${TONES[t.type]}`} /> {t.message}
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
