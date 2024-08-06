"use client"
import { ActivityIcon, type LucideIcon, PrinterIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const SummaryDashboard = () => {
    return (
        <div className="grid gap-1 md:grid-cols-2 md:gap-2">
            <CardItem title="Request masuk" total={15} icon={ActivityIcon} />
            <CardItem
                title="Siap diprint"
                description="Data sudah divalidasi"
                total={23}
                icon={PrinterIcon}
            />
        </div>
    )
}
export default SummaryDashboard

interface CardItemProps {
    title: string
    description?: string
    total: number
    icon: LucideIcon
}
const CardItem = (props: CardItemProps) => {
    return (
        <Card className="group transition-colors hover:bg-primary hover:text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex flex-col text-sm font-medium">
                    {props.title}
                    {props.description && (
                        <span className="text-xs font-light italic text-muted-foreground group-hover:text-primary-foreground">
                            ({props.description})
                        </span>
                    )}
                </CardTitle>
                <props.icon size={20} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{props.total}</div>
            </CardContent>
        </Card>
    )
}
