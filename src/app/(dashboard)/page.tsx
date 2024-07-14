import LayoutDashboard from "~/components/dashboard/layout-dashboard";

import DocumentValidation from "./components/document-validation";
import QueueDocument from "./components/queue-document";

export default function Dashboard() {
  return (
    <LayoutDashboard className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <div className="row-span-2 flex flex-col gap-3 lg:col-span-2">
        {/* <SummaryDashboard /> */}
        <QueueDocument />
      </div>
      <DocumentValidation />
    </LayoutDashboard>
  );
}
