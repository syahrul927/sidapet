import { GiGraveFlowers } from "react-icons/gi";
import { type IconType } from "react-icons/lib";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { z } from "zod";
import { FieldConfig } from "~/components/ui/auto-form/types";
import { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import { SKKFormFieldConfig, SKKFormSchema } from "./skk/form";
import { SKKValidationFieldConfig, SKKValidationScema } from "./skk/validation";
import { SKUFormFieldConfig, SKUFormSchema } from "./sku/form";
import {
  SKUValidationFieldConfig,
  SKUValidationSchema,
} from "./sku/validation";

const schemas = [SKUFormSchema, SKKFormSchema] as const;
type SchemaUnion = (typeof schemas)[number];
export type ServicesDocumentProps<T extends ZodObjectOrWrapped> = {
  code: string;
  title: string;
  description?: string;
  icon: IconType;
  formSchema: T;
  formFieldConfig: FieldConfig<z.infer<T>>;
  validationSchema: T;
  validationFieldConfig: (values: string) => FieldConfig<z.infer<T>>;
  templatePath: string;
  documentId: string;
  notes?: string;
};
export type DynamicPropsArray = ServicesDocumentProps<SchemaUnion>;
export const ServicesDocument: DynamicPropsArray[] = [
  {
    code: "SKU",
    title: "Surat Keterangan Usaha",
    icon: PiHandCoinsDuotone,
    formSchema: SKUFormSchema,
    formFieldConfig: SKUFormFieldConfig,
    validationSchema: SKUValidationSchema,
    validationFieldConfig: SKUValidationFieldConfig,
    templatePath: "/template/SKU.docx",
    documentId: "553",
    notes:
      "Ketika mengambil surat di Kelurahan, Bawa beberapa persyaratan untuk dijadikan bukti diantaranya: Fotocopy KTP dan Surat Pengantar RT/RW",
  },
  {
    code: "SKK",
    title: "Surat Keterangan Kematian",
    icon: GiGraveFlowers,
    formSchema: SKKFormSchema,
    formFieldConfig: SKKFormFieldConfig,
    validationSchema: SKKValidationScema,
    validationFieldConfig: SKKValidationFieldConfig,
    templatePath: "/template/SKK.docx",
    documentId: "553",
    notes:
      "Ketika mengambil surat di Kelurahan, Bawa beberapa persyaratan untuk dijadikan bukti diantaranya: Fotocopy KTP dan Surat Pengantar RT/RW",
  },
];
export const MapServiceDocument = ServicesDocument.reduce(
  (acc, document) => {
    acc[document.code] = document;
    return acc;
  },
  {} as Record<string, DynamicPropsArray>,
);
