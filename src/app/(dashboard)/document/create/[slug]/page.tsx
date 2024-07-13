import LayoutDashboard from "~/components/dashboard/layout-dashboard";
import SKJDocument from "~/components/document/services/skj/form";
import { ServicesDocument } from "~/data/service";
import { type PageType } from "~/types/page-type";

const DocumentCreateService = ({ params }: PageType) => {
  const slug = params.slug;
  const service = ServicesDocument.find((service) => service.id === slug);
  return (
    <LayoutDashboard back title={`Buat ${service?.label}`}>
      <SKJDocument />
    </LayoutDashboard>
  );
};
export default DocumentCreateService;
