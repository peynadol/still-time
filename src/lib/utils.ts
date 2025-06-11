import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitle(str: string) {
  // want to split the strings at a space
  // want to upper case the index [0] of each element of the array
  // want to join
  const split = str.split(" ");

  // slice at first element, cap first el, join
  const capitalised = split.map(
    (el) => el.charAt(0).toUpperCase() + el.substring(1)
  );
  const joined = capitalised.join(" ");
  return joined;
}
