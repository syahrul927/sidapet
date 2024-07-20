import DocumentServices from "~/components/document/services";
import HeaderMobile from "./components/header-mobile";

const CreateDocumentPublicPage = () => {
  return (
    <main className="" id="#">
      <HeaderMobile />
      <div className="flex flex-col p-3">
        <h1 className="text-center">Pembuatan Surat Kel. Margahayu</h1>
        <DocumentServices />
      </div>
    </main>
  );
};
export default CreateDocumentPublicPage;
