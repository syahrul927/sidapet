import React, { HTMLAttributes } from "react";
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
          "container mx-auto flex flex-col gap-6 md:max-w-screen-xl",
        )}
      >
        {title && <h1>{title}</h1>}
        {children}
      </div>
    );
  },
);
export default LayoutDashboard;
