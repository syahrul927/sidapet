import { type IconType } from "react-icons/lib";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { z } from "zod";
import { FieldConfig } from "~/components/ui/auto-form/types";
import { type ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import { SKJFormFieldConfig, SKUFormSchema } from "./sku/form";
import {
  SKJValidationFieldConfig,
  SKJValidationSchema,
} from "./sku/validation";

// Collect schemas into an array
const schemas = [SKUFormSchema] as const;
type SchemaUnion = (typeof schemas)[number];

export interface ServicesDocumentProps<T extends ZodObjectOrWrapped> {
  code: string;
  title: string;
  description?: string;
  icon: IconType;
  formSchema: T;
  formFieldConfig: FieldConfig<z.infer<T>>;
  validationSchema: T;
  validationFieldConfig: (values: z.infer<T>) => FieldConfig<z.infer<T>>;
  templatePath: string;
  documentId: string;
}
export type DynamicPropsArray = ServicesDocumentProps<SchemaUnion>;
export const ServicesDocument: DynamicPropsArray[] = [
  {
    code: "SKU",
    title: "Surat Keterangan Usaha",
    icon: PiHandCoinsDuotone,
    formSchema: SKUFormSchema,
    formFieldConfig: SKJFormFieldConfig,
    validationSchema: SKJValidationSchema,
    validationFieldConfig: SKJValidationFieldConfig,
    templatePath: "/template/templateSKU.docx",
    documentId: "553",
  },
  // {
  //   code: "SKJ",
  //   title: "Surat Keterangan Janda",
  //   icon: PiGenderFemale,
  //   formSchema: SKJFormSchema,
  //   formValidationSchema: SKJFormValidationSchema,
  //   templatePath: "/template/templateSKU.docx",
  //   documentId: "550",
  // },
  // {
  //   code: "SKD",
  //   title: "Surat Keterangan Duda",
  //   icon: PiGenderMale,
  //   formSchema: SKJFormSchema,
  //   formValidationSchema: SKJFormValidationSchema,
  //   templatePath: "/template/templateSKU.docx",
  //   documentId: "551",
  // },
  // {
  //   code: "SKTM",
  //   title: "Surat Keterangan Tidak Mampu",
  //   icon: PiCoins,
  //   formSchema: SKJFormSchema,
  //   formValidationSchema: SKJFormValidationSchema,
  //   templatePath: "/template/templateSKU.docx",
  //   documentId: "552",
  // },
  // {
  //   code: "SDTT",
  //   title: "Surat Domisili Tempat Tinggal",
  //   icon: PiHouseLine,
  //   formSchema: SKJFormSchema,
  //   formValidationSchema: SKJFormValidationSchema,
  //   templatePath: "/template/templateSKU.docx",
  //   documentId: "554",
  // },
];
export const MapServiceDocument = ServicesDocument.reduce(
  (acc, document) => {
    acc[document.code] = document;
    return acc;
  },
  {} as { [key: string]: DynamicPropsArray },
);
