import { ArrowUpRightIcon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { ServicesDocument } from "~/data/service";

interface DocumentServicesProps {
  isPublic?: boolean;
}
const DocumentServices = ({ isPublic }: DocumentServicesProps) => {
  return (
    <div className="grid w-full gap-3 py-3 lg:grid-cols-2 xl:grid-cols-3">
      {ServicesDocument.map((service) => (
        <ServiceItem isPublic={isPublic} key={service.code} {...service} />
      ))}
    </div>
  );
};
export default DocumentServices;
const ServiceItem = (props: {
  isPublic?: boolean;
  title: string;
  icon: LucideIcon | (() => ReactNode);
  code: string;
}) => {
  const prefixUrl = props.isPublic ? "/public/create/" : "/document/create/";
  return (
    <Link href={`${prefixUrl}${props.code}`}>
      <div className="relative flex min-h-32 cursor-pointer flex-col justify-center rounded-lg border bg-card p-3 transition-colors duration-150 hover:bg-primary hover:text-primary-foreground ">
        <div className="absolute right-3 top-3 w-fit">
          <ArrowUpRightIcon size={24} />
        </div>
        <div className="flex w-full items-center">
          <div className="px-3">
            <props.icon size={40} />
          </div>
          <h4 className="flex-1 font-semibold">{props.title}</h4>
        </div>
      </div>
    </Link>
  );
};
