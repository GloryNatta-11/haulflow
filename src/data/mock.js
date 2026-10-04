// Mock data. Swap for Firestore-backed services later; keep the same shapes.
export const STATUSES = ['Scheduled', 'Assigned', 'In Progress', 'Completed']
export const jobs = [
  { id: 'JOB-1042', customer: 'ABC Construction', location: 'Austin, TX', service: 'Roll-Off Delivery', container: 'C-104', truck: 'TRK-07', driver: 'Mike Johnson', time: '8:00 AM', status: 'Assigned' },
  { id: 'JOB-1043', customer: 'Green Valley Roofing', location: 'Dallas, TX', service: 'Container Pickup', container: 'C-082', truck: 'TRK-03', driver: 'James Carter', time: '9:30 AM', status: 'In Progress' },
  { id: 'JOB-1044', customer: 'Summit Builders', location: 'Austin, TX', service: 'Container Swap', container: 'C-115', truck: 'TRK-11', driver: 'Robert Davis', time: '11:00 AM', status: 'Scheduled' },
  { id: 'JOB-1045', customer: 'Lone Star Remodeling', location: 'Houston, TX', service: 'Roll-Off Delivery', container: 'C-091', truck: 'TRK-05', driver: 'Daniel Brooks', time: '12:15 PM', status: 'Scheduled' },
  { id: 'JOB-1046', customer: 'Blue Ridge Contractors', location: 'San Antonio, TX', service: 'Waste Hauling', container: 'C-120', truck: 'TRK-09', driver: 'Luis Ortega', time: '1:30 PM', status: 'Scheduled' },
  { id: 'JOB-1038', customer: 'Pioneer Demolition', location: 'Fort Worth, TX', service: 'Container Pickup', container: 'C-067', truck: 'TRK-02', driver: 'James Carter', time: '7:00 AM', status: 'Completed' },
  { id: 'JOB-1039', customer: 'Texan Landscaping', location: 'Plano, TX', service: 'Material Pickup', container: 'C-143', truck: 'TRK-04', driver: 'Robert Davis', time: '7:30 AM', status: 'Completed' },
  { id: 'JOB-1040', customer: 'Capitol City Homes', location: 'Round Rock, TX', service: 'Roll-Off Delivery', container: 'C-109', truck: 'TRK-12', driver: 'Mike Johnson', time: '2:45 PM', status: 'Scheduled' },
]
export const activity = [
  { time: '8:42 AM', user: 'Mike Johnson', text: 'marked JOB-1042 as Delivered.' },
  { time: '8:35 AM', user: 'Dispatcher', text: 'assigned TRK-07 to JOB-1042.' },
  { time: '8:21 AM', user: 'ABC Construction', text: 'sent a new pickup request.' },
  { time: '7:58 AM', user: 'System', text: 'JOB-1038 completed.' },
]
export const metrics = [
  { label: "Today's Jobs", value: 24, note: '+12% vs yesterday' },
  { label: 'In Progress', value: 8 },
  { label: 'Scheduled', value: 11 },
  { label: 'Completed', value: 5 },
  { label: 'Containers Out', value: 67 },
  { label: 'Available Trucks', value: 9 },
]
