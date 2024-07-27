import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { DialogTrigger } from "~/components/ui/dialog";
import { fromNow } from "~/lib/date";

interface Props {
  documentType: string;
  name: string;
  createdDate: Date;
  status: string;
  documentCode: string;
  documentCounter: string;
}
const RequestTriggerDocument = (props: Props) => {
  return (
    <DialogTrigger asChild>
      <Card className="hover:text-background-foreground cursor-pointer hover:bg-background/90">
        <CardHeader className="flex flex-row justify-between px-4 py-2">
          <div>
            <CardTitle className="text-lg">{props.documentType}</CardTitle>
            <CardDescription className="text-sm">{props.name}</CardDescription>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">
            {fromNow(props.createdDate)}
          </p>
        </CardHeader>
        <CardContent className="gap-1 space-x-1 px-4">
          <Badge variant={props.status === "NEW" ? "accent" : "default"}>
            {props.status}
          </Badge>
          <Badge variant="outline">{props.documentCode}</Badge>
          <Badge variant="outline">#{props.documentCounter}</Badge>
        </CardContent>
      </Card>
    </DialogTrigger>
  );
};
export default RequestTriggerDocument;
