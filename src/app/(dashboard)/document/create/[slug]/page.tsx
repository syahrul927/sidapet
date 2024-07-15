import LayoutDashboard from "~/components/dashboard/layout-dashboard";
import SKJDocument from "~/components/document/services/skj/form";
import { type PageType } from "~/types/page-type";

const DocumentCreateService = ({}: PageType) => {
  return (
    <LayoutDashboard back>
      <SKJDocument />
    </LayoutDashboard>
  );
};
export default DocumentCreateService;
