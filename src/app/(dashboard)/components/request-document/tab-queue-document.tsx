"use client"
import LoadingPage from "~/components/ui/loading-page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { type RouterOutputs } from "~/trpc/react"
import { useQueue } from "../../hooks/use-queue"
import { type RequestItemProps } from "./type"
import dynamic from "next/dynamic"
const WrapperListRequest = dynamic(() => import("./wrapper-list-request"), {
    ssr: false,
    loading: () => <LoadingPage />,
})

const mapper = (
    list: RouterOutputs["document"]["getWaitingRequest"],
): RequestItemProps[] => {
    return list.map((item) => ({
        documentCounter: item.documentConter,
        name: item.ownerName ?? "",
        documentCode: item.documentCode,
        formatDocument: JSON.stringify(item.formatDocument) ?? "",
        createdDate: item.createdDate,
        status: item.status,
        id: item.id,
    }))
}

const TabQueueDocument = () => {
    const { listNew, listValidated, isPending } = useQueue()
    return (
        <div className="flex flex-col">
            <Tabs defaultValue="NEW">
                <TabsList>
                    <TabsTrigger value="NEW">
                        Request Masuk ({listNew.length})
                    </TabsTrigger>
                    <TabsTrigger value="VALIDATED">
                        Siap diprint ({listValidated.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="NEW">
                    <Wrapper isPending={isPending} data={mapper(listNew)} />
                </TabsContent>
                <TabsContent value="VALIDATED">
                    <Wrapper
                        isPending={isPending}
                        data={mapper(listValidated)}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default TabQueueDocument

const Wrapper = ({
    isPending,
    data,
}: {
    isPending: boolean
    data: RequestItemProps[]
}) => {
    return isPending ? <LoadingPage /> : <WrapperListRequest data={data} />
}
