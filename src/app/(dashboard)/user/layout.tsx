import { type ReactNode } from "react";
import LayoutDashboard from "~/components/dashboard/layout-dashboard";

const LayoutUser = ({ children }: { children: ReactNode }) => {
  return <LayoutDashboard>{children}</LayoutDashboard>;
};
export default LayoutUser;
