import Sidebar from '@/components/admin/Sidebar'

export const metadata = {
  title: { default: 'Admin Panel', template: '%s | Admin Panel' },
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-container-low">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
