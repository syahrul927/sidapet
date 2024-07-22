"use client";

import { QueueProvider } from "./hooks/use-queue";

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  return <QueueProvider>{children}</QueueProvider>;
};
export default DashboardTemplate;
