"use client"
import LayoutDashboard from "~/components/dashboard/layout-dashboard"
import TabQueueDocument from "./components/request-document/tab-queue-document"
import QueueProvider from "./hooks/use-queue"

export default function Dashboard() {
    return (
        <LayoutDashboard title={"Antrian Dokumen"}>
            <QueueProvider>
                <TabQueueDocument />
            </QueueProvider>
        </LayoutDashboard>
    )
}
