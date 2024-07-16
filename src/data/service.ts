import { type IconType } from "react-icons/lib";
import {
  PiCoins,
  PiGenderFemale,
  PiGenderMale,
  PiHandCoinsDuotone,
  PiHouseLine,
} from "react-icons/pi";
import { FieldConfig } from "~/components/ui/auto-form/types";
import { type ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import { SKJFormSchema, SKJFormValidationSchema } from "./skj/type";
import { z } from "zod";

// Collect schemas into an array
const schemas = [SKJFormSchema] as const;
type SchemaUnion = (typeof schemas)[number];

export interface ServicesDocumentProps<T extends ZodObjectOrWrapped> {
  code: string;
  title: string;
  description?: string;
  icon: IconType;
  formSchema: T;
  fieldConfig?: FieldConfig<z.infer<T>>;
  formValidationSchema: ZodObjectOrWrapped;
  templatePath: string;
  documentId: string;
}
type DynamicPropsArray = ServicesDocumentProps<SchemaUnion>[];
export const ServicesDocument: DynamicPropsArray = [
  {
    code: "SKJ",
    title: "Surat Keterangan Janda",
    icon: PiGenderFemale,
    formSchema: SKJFormSchema,
    formValidationSchema: SKJFormValidationSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "550",
  },
  {
    code: "SKD",
    title: "Surat Keterangan Duda",
    icon: PiGenderMale,
    formSchema: SKJFormSchema,
    formValidationSchema: SKJFormValidationSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "551",
  },
  {
    code: "SKTM",
    title: "Surat Keterangan Tidak Mampu",
    icon: PiCoins,
    formSchema: SKJFormSchema,
    formValidationSchema: SKJFormValidationSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "552",
  },
  {
    code: "SKU",
    title: "Surat Keterangan Usaha",
    icon: PiHandCoinsDuotone,
    formSchema: SKJFormSchema,
    fieldConfig: {
      suratPengantar: {
        fieldType: "file",
      },
      gender: {
        fieldType: "radio",
      },
      marriage: {
        fieldType: "radio",
      },
      description: {
        fieldType: "textarea",
        description: "Tuliskan maksud dan keperluan secara lengkap!",
      },
      address: {
        description: "Sesuaikan dengan alamat pada KTP",
        fieldType: "textarea",
      },
    },
    formValidationSchema: SKJFormValidationSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "553",
  },
  {
    code: "SDTT",
    title: "Surat Domisili Tempat Tinggal",
    icon: PiHouseLine,
    formSchema: SKJFormSchema,
    formValidationSchema: SKJFormValidationSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "554",
  },
];
