"use client";
import { useRouter } from "next/navigation";
import React, { type HTMLAttributes } from "react";
import { PiArrowLeft } from "react-icons/pi";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

interface LayoutDashboardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  back?: boolean;
}
const LayoutDashboard = React.forwardRef<HTMLDivElement, LayoutDashboardProps>(
  ({ children, className, back, title, ...props }, ref) => {
    const router = useRouter();
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative mx-auto flex flex-col gap-6 md:container md:max-w-screen-xl",
          className,
        )}
      >
        {title && <h2>{title}</h2>}
        {children}
      </div>
    );
  },
);
LayoutDashboard.displayName = "Layout Dashboard";
export default LayoutDashboard;
