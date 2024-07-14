import { type IconType } from "react-icons/lib";
import {
  PiCoins,
  PiGenderFemale,
  PiGenderMale,
  PiHandCoinsDuotone,
  PiHouseLine,
} from "react-icons/pi";
import { type ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import { skjFormSchema } from "./skj/type";

export interface ServicesDocumentProps {
  id: string;
  label: string;
  icon: IconType;
  formSchema: ZodObjectOrWrapped;
  templatePath: string;
  documentId: string;
}
export const ServicesDocument: ServicesDocumentProps[] = [
  {
    id: "01",
    label: "Surat Keterangan Janda",
    icon: PiGenderFemale,
    formSchema: skjFormSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "553",
  },
  {
    id: "02",
    label: "Surat Keterangan Duda",
    icon: PiGenderMale,
    formSchema: skjFormSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "553",
  },
  {
    id: "03",
    label: "Surat Keterangan Tidak Mampu",
    icon: PiCoins,
    formSchema: skjFormSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "553",
  },
  {
    id: "03",
    label: "Surat Keterangan Usaha",
    icon: PiHandCoinsDuotone,
    formSchema: skjFormSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "553",
  },
  {
    id: "04",
    label: "Surat Domisili Tempat Tinggal",
    icon: PiHouseLine,
    formSchema: skjFormSchema,
    templatePath: "/template/templateSKU.docx",
    documentId: "553",
  },
];
