import { format, getMonth, parse } from "date-fns";
import { es } from 'date-fns/locale'

// TODO: In the feature add DateManager.ts that configuers the date-fns object with the language of the user

/**
 * Converts a date from a given format to a desired format.
 *
 * @param inputDate - The date as a string. E.g.: '27-06-2025'
 * @param currentFormat - The current format of the date (default: 'dd-MM-yyyy')
 * @param targetFormat - The desired format (default: 'yyyy-MM-dd')
 * @returns {string} The converted date as a string in the new format
 *
 * @example
 * formatDate('27-06-2025') // '2025-06-27'
 * formatDate('2025/06/27', 'yyyy/MM/dd', 'dd-MM-yyyy') // '27-06-2025'
 */
export function formatDateString(
  inputDate: string,
  currentFormat: string = 'dd-MM-yyyy',
  targetFormat: string = 'yyyy-MM-dd'
): string {
  const parsedDate = parseDate(inputDate, currentFormat);
  return format(parsedDate, targetFormat);
}

/**
 * Returns the name of the month from a date string.
 *
 * @param {string} inputDate - The date string to parse (e.g., "2025-07-30").
 * @param {string} currentFormat - The format of the input date (e.g., "yyyy-MM-dd").
 * @param {'MMM' | 'MMMM'} [monthFormat='MMM'] - The desired format for the month:
 *        - 'MMM' returns abbreviated month (e.g., "Jul").
 *        - 'MMMM' returns full month name (e.g., "July").
 * @param {'es' | 'en'} [language='en'] - Language code for the month name ('es' for Spanish, 'en' for English).
 * @returns {string} The formatted month name in lowercase.
 */
export function getMonthName(
  inputDate: string, 
  currentFormat: string, 
  monthFormat: 'MMM' | 'MMMM' = 'MMM', 
  language: 'es' | 'en' = 'en'
): string {
  const parsedDate = parseDate(inputDate, currentFormat);

  const localeOptions = ( language==='es') ? { locale: es } : {};
  return format( parsedDate, 'MMM', localeOptions ).toLowerCase();
}

function parseDate(inputDate: string, currentFormat: string) {
  const parsedDate = parse(inputDate, currentFormat, new Date());

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`The date: "${inputDate}" is not valid for the format: "${currentFormat}"`);
  }

  return parsedDate;
}
