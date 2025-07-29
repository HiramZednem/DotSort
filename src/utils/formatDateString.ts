import { format, parse } from "date-fns";


/**
 * Converts a date from a given format to a desired format.
 *
 * @param inputDate - The date as a string. E.g.: '27-06-2025'
 * @param currentFormat - The current format of the date (default: 'dd-MM-yyyy')
 * @param targetFormat - The desired format (default: 'yyyy-MM-dd')
 * @returns The converted date as a string in the new format
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
  const parsedDate = parse(inputDate, currentFormat, new Date());

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`The date: "${inputDate}" is not valid for the format: "${currentFormat}"`);
  }

  return format(parsedDate, targetFormat);
}
