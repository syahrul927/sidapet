import LayoutDashboard from "~/components/dashboard/layout-dashboard"
import DocumentServices from "~/components/document/services"
const CreateDocumentPage = () => {
    return (
        <LayoutDashboard title="Buat Pengajuan Surat">
            <DocumentServices />
        </LayoutDashboard>
    )
}
export default CreateDocumentPage
