import DocumentServices from "~/components/document/services"

const CreateDocumentPublicPage = () => {
    return (
        <div className="mt-6  flex flex-col space-y-6 p-3">
            <p className="max-w-sm">
                <span className="text-xl font-bold">Selamat Datang,</span> Web
                Formulir Pembuatan Surat Kelurahan Margahayu Bekasi
            </p>
            <DocumentServices isPublic />
        </div>
    )
}
export default CreateDocumentPublicPage
