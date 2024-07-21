import { ReactNode } from "react";
import HeaderMobile from "./components/header-mobile";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
const LayoutPublic = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-accent/20 to-primary/20"></div>
      <HeaderMobile />
      <div className="md:container md:mt-12">{children}</div>
    </main>
  );
};
export default LayoutPublic;
