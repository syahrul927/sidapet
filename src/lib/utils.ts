import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import "moment/locale/id";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function fromNow(date: Date) {
  const formatted = moment(date);
  formatted.locale("id");
  return formatted.fromNow();
}

const padDate = (str: string | number) => {
  return String(str).padStart(2, "0");
};
export function formatDate(element: Date) {
  return `${padDate(element.getDate())}/${padDate(element.getMonth() + 1)}/${element.getFullYear()}`;
}
