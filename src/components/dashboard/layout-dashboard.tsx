"use client";
import React, { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface LayoutDashboardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}
const LayoutDashboard = React.forwardRef<HTMLDivElement, LayoutDashboardProps>(
  ({ children, className, title, ...props }, ref) => {
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
