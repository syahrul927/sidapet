import LayoutDashboard from "~/components/dashboard/layout-dashboard";

import QueueDocument from "./components/queue-document";

export default function Dashboard() {
  return (
    <LayoutDashboard className="">
      <QueueDocument />
    </LayoutDashboard>
  );
}
