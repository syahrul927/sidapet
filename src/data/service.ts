import { RiHome4Line, RiMenLine, RiWomenLine } from "react-icons/ri";
import { FaRupiahSign } from "react-icons/fa6";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import { z } from "zod";

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
    icon: RiWomenLine,
  },
  {
    id: "02",
    label: "Surat Keterangan Duda",
    icon: RiMenLine,
  },
  {
    id: "03",
    label: "Surat Keterangan Tidak Mampu",
    icon: FaRupiahSign,
  },
  {
    id: "03",
    label: "Surat Keterangan Usaha",
    icon: LiaBusinessTimeSolid,
  },
  {
    id: "04",
    label: "Surat Domisili Tempat Tinggal",
    icon: RiHome4Line,
  },
];
