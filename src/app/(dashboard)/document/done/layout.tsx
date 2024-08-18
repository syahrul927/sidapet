import { type ReactNode } from "react"
import LayoutDashboard from "~/components/dashboard/layout-dashboard"

const LayoutDocumentDone = ({ children }: { children: ReactNode }) => {
    return (
        <LayoutDashboard
            title="Histori Surat"
            description="Klik untuk mendownload dokumen"
        >
            {children}
        </LayoutDashboard>
    )
}
export default LayoutDocumentDone
