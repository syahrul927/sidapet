import { z } from "zod";
import { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";

export const parseToSchema = <T extends ZodObjectOrWrapped>(
  schema: T,
  str: string,
): z.infer<T> => {
  return schema.parse(JSON.parse(str));
};
