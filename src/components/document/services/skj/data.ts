import { z } from "zod";

export const skjFormSchema = z.object({
  name: z.string({ message: "Nama wajib di isi " }),
  phoneNumber: z.string(),
  email: z.string().email(),
  ktpFile: z.string({ message: "Upload foto ktp kamu" }),
});
export type SKJFormType = z.infer<typeof skjFormSchema>;
