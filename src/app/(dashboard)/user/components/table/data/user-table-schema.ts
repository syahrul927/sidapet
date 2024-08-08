import { z } from "zod"

export const UserTableSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    createdDate: z.date().optional(),
})

export type UserTableSchemaProps = z.infer<typeof UserTableSchema>
