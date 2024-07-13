import { IconType } from "react-icons/lib";
import {
  PiCoins,
  PiGenderFemale,
  PiGenderMale,
  PiHandCoinsDuotone,
  PiHouseLine,
} from "react-icons/pi";

export interface ServicesDocumentProps {
  id: string;
  label: string;
  icon: IconType;
}
interface FormProps {
  label: string;
  type: "text" | "number" | "image";
}
export const ServicesDocument = [
  {
    id: "01",
    label: "Surat Keterangan Janda",
    icon: PiGenderFemale,
  },
  {
    id: "02",
    label: "Surat Keterangan Duda",
    icon: PiGenderMale,
  },
  {
    id: "03",
    label: "Surat Keterangan Tidak Mampu",
    icon: PiCoins,
  },
  {
    id: "03",
    label: "Surat Keterangan Usaha",
    icon: PiHandCoinsDuotone,
  },
  {
    id: "04",
    label: "Surat Domisili Tempat Tinggal",
    icon: PiHouseLine,
  },
];
