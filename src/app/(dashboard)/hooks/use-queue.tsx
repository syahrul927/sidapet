"use client";

import { type ReactNode, createContext, useContext, useMemo } from "react";
import { type RouterOutputs, api } from "~/trpc/react";

type Queue = RouterOutputs["document"]["getWaitingRequest"];
type QueueType = {
  listNew: Queue;
  listValidated: Queue;
  isPending: boolean;
  refetch: () => void;
};
const QueueContext = createContext<QueueType | null>(null);
export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("use Queue must be used within a <QueueProvider />");
  }
  return context;
};

export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending, refetch } =
    api.document.getWaitingRequest.useQuery();
  const value: QueueType = useMemo(() => {
    return {
      isPending,
      refetch,
      listNew: data?.filter((item) => item.status === "NEW") ?? [],
      listValidated: data?.filter((item) => item.status === "VALIDATED") ?? [],
    };
  }, [data, isPending, refetch]);
  return (
    <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
  );
};
