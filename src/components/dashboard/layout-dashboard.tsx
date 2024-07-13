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
          "container mx-auto flex flex-col gap-6 md:max-w-screen-xl",
          className,
        )}
      >
        <div className="flex space-x-3">
          {back && (
            <Button
              variant={"ghost"}
              onClick={() => router.back()}
              size={"icon"}
            >
              <PiArrowLeft size={24} />
            </Button>
          )}
          {title && <h2>{title}</h2>}
        </div>
        {children}
      </div>
    );
  },
);
LayoutDashboard.displayName = "Layout Dashboard";
export default LayoutDashboard;
