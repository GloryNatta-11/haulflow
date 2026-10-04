import { Card, EmptyState, PageHeader } from '../components/ui.jsx'
export default function Placeholder({ title }) {
  return (<><PageHeader title={title} /><Card><EmptyState title={`${title} is coming in a later phase`} hint="The route, permissions and navigation are already wired up." /></Card></>)
}
