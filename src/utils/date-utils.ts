import { format, getMonth, parse } from "date-fns";
import { es } from 'date-fns/locale'
import { Language, Month } from "../types/common";

// TODO: In the feature add DateManager.ts that configuers the date-fns object with the language of the user

/**
 * Converts a date from a given format to a desired format.
 *
 * @param inputDate - The date as a string. E.g.: '27-06-2025'
 * @param currentFormat - The current format of the date 
 * @param targetFormat - The desired format
 * @returns {string} The converted date as a string in the new format
 *
 * @example
 * formatDate('27-06-2025') // '2025-06-27'
 * formatDate('2025/06/27', 'yyyy/MM/dd', 'dd-MM-yyyy') // '27-06-2025'
 */
export function formatDateString(
  inputDate: string,
  currentFormat: string,
  targetFormat: string
): string {
  const parsedDate = getDateByFormat(inputDate, currentFormat);
  return format(parsedDate, targetFormat);
}

/**
 * Returns the name of the month 
 * @param {Month} month 
 * @param {'MMM' | 'MMMM'} [monthFormat='MMM'] - The desired format for the month:
 *        - 'MMM' returns abbreviated month (e.g., "Jul").
 *        - 'MMMM' returns full month name (e.g., "July").
 * @param {Language} [language='en'] - Language code for the month name ('es' for Spanish, 'en' for English).
 * @returns {string} The formatted month name in lowercase.
 */
export function getMonthName(
  month: Month,
  monthFormat: 'MMM' | 'MMMM' = 'MMM', 
  language: Language = 'en'
): string {
  const referenceYear = 2025;
  const date = new Date(referenceYear, month);

  const localeOptions = ( language==='es') ? { locale: es } : {};
  return format( date , monthFormat, localeOptions ).toLowerCase();
}

export function getDateByFormat(inputDate: string, currentFormat: string) {
  const parsedDate = parse(inputDate, currentFormat, new Date());

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`The date: "${inputDate}" is not valid for the format: "${currentFormat}"`);
  }

  return parsedDate;
}
