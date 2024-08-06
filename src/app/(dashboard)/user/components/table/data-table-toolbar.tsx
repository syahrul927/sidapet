"use client"

import { XIcon } from "lucide-react"
import Link from "next/link"
import { DataTableViewOptions } from "~/components/ui/table/data-table-view-options"
import { type DataTableToolbarProps } from "~/components/ui/table/table-type"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export function DataTableToolbarUser<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Cari User"
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <XIcon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
            <Link href="/user/add">
                <Button className="h-8 sm:ml-3">Add New</Button>
            </Link>
        </div>
    )
}
