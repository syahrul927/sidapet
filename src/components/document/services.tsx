import Link from "next/link";
import { IconType } from "react-icons/lib";
import { RiArrowRightUpLine } from "react-icons/ri";
import { ServicesDocument } from "~/data/service";

const DocumentServices = () => {
  return (
    <div className="grid w-full gap-3 py-3 lg:grid-cols-2 xl:grid-cols-3">
      {ServicesDocument.map((service) => (
        <ServiceItem {...service} />
      ))}
    </div>
  );
};
export default DocumentServices;
const ServiceItem = (props: { label: string; icon: IconType; id: string }) => {
  return (
    <Link href={`/document/create/${props.id}`}>
      <div className="relative flex min-h-32 cursor-pointer flex-col justify-center rounded-lg border bg-card p-3 transition-colors duration-150 hover:bg-primary hover:text-primary-foreground ">
        <div className="absolute right-3 top-3 w-fit">
          <RiArrowRightUpLine size={24} />
        </div>
        <div className="flex w-full items-center">
          <div className="px-3">
            <props.icon size={40} />
          </div>
          <h4 className="flex-1 font-semibold">{props.label}</h4>
        </div>
      </div>
    </Link>
  );
};
