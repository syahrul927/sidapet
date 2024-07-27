import QueueProvider from "../../hooks/use-queue";
import ListDoneRequest from "./components/list-done-request";

const DoneDocumentPage = () => {
  return (
    <QueueProvider>
      <ListDoneRequest />
    </QueueProvider>
  );
};
export default DoneDocumentPage;
