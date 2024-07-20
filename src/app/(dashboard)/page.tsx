"use client";
import LayoutDashboard from "~/components/dashboard/layout-dashboard";

import QueueDocument from "./components/queue-document";
import { QueueProvider } from "./hooks/use-queue";

export default function Dashboard() {
  return (
    <LayoutDashboard className="">
      <QueueProvider>
        <QueueDocument />
      </QueueProvider>
    </LayoutDashboard>
  );
}
