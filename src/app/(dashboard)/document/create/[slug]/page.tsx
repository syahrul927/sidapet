import LayoutDashboard from "~/components/dashboard/layout-dashboard";
import SKJDocument from "~/components/document/services/skj/form";
import { PageType } from "~/types/page-type";

const DocumentCreateService = ({ params }: PageType) => {
  const slug = params.slug;
  return (
    <LayoutDashboard title={`Create Document ${slug}`}>
      <SKJDocument />
    </LayoutDashboard>
  );
};
export default DocumentCreateService;
