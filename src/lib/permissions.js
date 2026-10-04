// Single source of truth for role permissions.
// UI hiding is UX only. Real enforcement = Firestore Security Rules + Cloud Functions.
export const ROLES = ['Admin', 'Dispatcher', 'Manager', 'Driver']
const MATRIX = {
  'dashboard.view': ['Admin', 'Dispatcher', 'Manager'],
  'jobs.view': ['Admin', 'Dispatcher', 'Manager'],
  'jobs.create': ['Admin', 'Dispatcher'],
  'ops.view': ['Admin', 'Dispatcher'],
  'activity.view': ['Admin', 'Dispatcher', 'Manager'],
  'reports.view': ['Admin', 'Manager'],
  'settings.view': ['Admin'],
  'driver.app': ['Driver'],
}
export const can = (role, permission) => MATRIX[permission]?.includes(role) ?? false
export const homeFor = (role) => (role === 'Driver' ? '/driver' : '/dashboard')
