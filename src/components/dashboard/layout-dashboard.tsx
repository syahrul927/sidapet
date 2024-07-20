"use client";
import React, { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface LayoutDashboardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}
const LayoutDashboard = React.forwardRef<HTMLDivElement, LayoutDashboardProps>(
  ({ children, className, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative flex flex-col gap-6 md:container md:mx-auto md:max-w-screen-xl",
          className,
        )}
      >
        <div className="flex flex-col space-y-1">
          {title && <h2>{title}</h2>}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    );
  },
);
LayoutDashboard.displayName = "Layout Dashboard";
export default LayoutDashboard;
