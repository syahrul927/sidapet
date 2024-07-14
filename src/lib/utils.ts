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
