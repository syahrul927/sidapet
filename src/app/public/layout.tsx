import { type ReactNode } from "react";
import HeaderMobile from "./components/header-mobile";
import { type Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
const LayoutPublic = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <div className="fixed inset-0 -z-10"></div>
      <HeaderMobile />
      <div className="md:container md:mt-12">{children}</div>
    </main>
  );
};
export default LayoutPublic;
