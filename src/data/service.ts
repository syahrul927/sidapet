import {
  CoinsIcon,
  DoorClosedIcon,
  FileHeartIcon,
  LucideIcon,
  MapPinIcon,
  MapPinOffIcon,
} from "lucide-react";
import { ReactNode } from "react";
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
import { SKBPMFormFieldConfig, SKBPMFormSchema } from "./skbpm/form";
import {
  SKBPMValidationFieldConfig,
  SKBPMValidationSchema,
} from "./skbpm/validation";
import { SKDTTFormFieldConfig, SKDTTFormSchema } from "./skdtt/form";
import {
  SKDTTValidationFieldConfig,
  SKDTTValidationSchema,
} from "./skdtt/validation";
import { SKDTTSFormFieldConfig, SKDTTSFormSchema } from "./skdtts/form";
import {
  SKDTTSValidationFieldConfig,
  SKDTTSValidationSchema,
} from "./skdtts/validation";

const schemas = [
  SKUFormSchema,
  SKKFormSchema,
  SKBPMFormSchema,
  SKDTTFormSchema,
  SKDTTSFormSchema,
] as const;
type SchemaUnion = (typeof schemas)[number];
export type ServicesDocumentProps<T extends ZodObjectOrWrapped> = {
  code: string;
  title: string;
  description?: string;
  icon: LucideIcon | (() => ReactNode);
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
    code: "SKDTTS",
    documentId: "471.1",
    title: "Surat Keterangan Domisili Tempat Tinggal Sementara",
    icon: MapPinOffIcon,
    formSchema: SKDTTSFormSchema,
    formFieldConfig: SKDTTSFormFieldConfig,
    validationSchema: SKDTTSValidationSchema,
    validationFieldConfig: SKDTTSValidationFieldConfig,
    templatePath: "/template/SKDTTS.docx",
    notes:
      "Ketika mengambil surat di Kelurahan, Bawa beberapa persyaratan untuk dijadikan bukti diantaranya: Fotocopy KTP dan Surat Pengantar RT/RW",
  },
  {
    code: "SKDTT",
    documentId: "471.1",
    title: "Surat Keterangan Domisili Tempat Tinggal",
    icon: MapPinIcon,
    formSchema: SKDTTFormSchema,
    formFieldConfig: SKDTTFormFieldConfig,
    validationSchema: SKDTTValidationSchema,
    validationFieldConfig: SKDTTValidationFieldConfig,
    templatePath: "/template/SKDTT.docx",
    notes:
      "Ketika mengambil surat di Kelurahan, Bawa beberapa persyaratan untuk dijadikan bukti diantaranya: Fotocopy KTP dan Surat Pengantar RT/RW",
  },
  {
    code: "SKBPM",
    documentId: "474.2",
    title: "Surat Keterangan Belum Pernah Menikah",
    icon: FileHeartIcon,
    formSchema: SKBPMFormSchema,
    formFieldConfig: SKBPMFormFieldConfig,
    validationSchema: SKBPMValidationSchema,
    validationFieldConfig: SKBPMValidationFieldConfig,
    templatePath: "/template/SKBPM.docx",
    notes:
      "Ketika mengambil surat di Kelurahan, Bawa beberapa persyaratan untuk dijadikan bukti diantaranya: Fotocopy KTP dan Surat Pengantar RT/RW",
  },
  {
    code: "SKU",
    title: "Surat Keterangan Usaha",
    icon: CoinsIcon,
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
    icon: DoorClosedIcon,
    formSchema: SKKFormSchema,
    formFieldConfig: SKKFormFieldConfig,
    validationSchema: SKKValidationScema,
    validationFieldConfig: SKKValidationFieldConfig,
    templatePath: "/template/SKK.docx",
    documentId: "474.3 ",
    notes:
      "Ketika mengambil surat di Kelurahan, Bawa beberapa persyaratan untuk dijadikan bukti diantaranya: Fotocopy KTP jenazah, orang tua dan pelapor ",
  },
];
export const MapServiceDocument = ServicesDocument.reduce(
  (acc, document) => {
    acc[document.code] = document;
    return acc;
  },
  {} as Record<string, DynamicPropsArray>,
);
