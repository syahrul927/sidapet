"use client"

import { useMemo } from "react"
import { MapServiceDocument } from "~/data/service"
import { type RequestItemProps } from "./type"
import RequestDialogNew from "./request-dialog-new"
import RequestDialogValidated from "./request-dialog-validated"

const RequestItem = (props: RequestItemProps) => {
    const docType = useMemo(
        () => MapServiceDocument[props.documentCode],
        [props.documentCode],
    )
    if (!docType) {
        return <p>Dokumen tidak Valid</p>
    }
    return props.status === "NEW" ? (
        <RequestDialogNew {...props} docType={docType} />
    ) : (
        <RequestDialogValidated {...props} docType={docType} />
    )
}

export default RequestItem
