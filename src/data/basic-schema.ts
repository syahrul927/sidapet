import { z } from "zod";

export const BasicSchema = z.object({
  name: z.string({
    message: "Nama wajib di isi",
    description: "Nama Lengkap",
  }),
  phoneNumber: z.string({ description: "Nomor Whatsapp/Telepon" }),
});

export type BasicSchemaType = z.infer<typeof BasicSchema>;
