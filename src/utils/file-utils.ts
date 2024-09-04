import { ChangeEvent } from "react"

export const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Optional chaining to handle potential null
    if (file) {
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
        if (validImageTypes.includes(file.type)) {
        } else {
        }
    }
}
