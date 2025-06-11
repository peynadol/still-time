import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitle(str: string) {
  const split = str.split(" ");

  const capitalised = split.map(
    (el) => el.charAt(0).toUpperCase() + el.substring(1)
  );
  const joined = capitalised.join(" ");
  return joined;
}
