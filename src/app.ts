
import { FileManager } from "./core/FileManager";
import { splitFileName } from "./utils/splitFileName";
import { formatDateString, getDateByFormat, getMonthName } from "./utils/date-utils";
import { Language } from './types/common';
import { Month } from "date-fns";


class App {
    private fileManager: FileManager;
    private language: Language;

    constructor(path: string, language: Language)  {
        this.fileManager = new FileManager(path)
        this.language = language;
    }

    /**
    * Standardizes the date format in file names within the managed directory.
    *
    * @param currentFormat - The current date format in the file names (default: 'dd-MM-yyyy').
    * @param targetFormat - The desired date format for the file names (default: 'yyyy-MM-dd').
    * @returns A promise that resolves when all file names have been processed.
    */
    public async standardizeFileDateNames(
        currentFormat: string = 'dd-MM-yyyy',
        targetFormat: string = 'yyyy-MM-dd'
    ) {
        const fileNames: string[] = await this.fileManager.readDirFiles();

        for (let fileName of fileNames) {

            const {date, restOfName} = splitFileName(fileName, currentFormat);

            let formattedDate;
            try {
                formattedDate = formatDateString(date, currentFormat, targetFormat).toLowerCase();
            } catch {
                console.warn(`Skipping file "${fileName}" due to invalid date format.`);
                continue;
            }
            const newFileName = formattedDate + restOfName;

            await this.fileManager.renameFile(fileName, newFileName);
        }
    }

    public async organizeFilesByDate(currentFormat: string = 'yyyy-MM-dd' ) {
        const fileNames: string[] = await this.fileManager.readDirFiles();
    
        for (let fileName of fileNames) {
            const { date: dateOfFile } = splitFileName(fileName, currentFormat);

            let date;
            try {
                date = getDateByFormat(dateOfFile, currentFormat);
            } catch {
                console.warn(`Skipping file "${fileName}" due to invalid date format.`);
                continue;
            }

            const monthIndex = date.getMonth();
            // wtf did i trote here
            const monthIndexHumanFormat = ('0' + (monthIndex + 1)).slice(-2);
            const monthName = getMonthName(monthIndex);
            const year = date.getFullYear();

            const newPath = `${year}/${monthIndexHumanFormat}-${monthName}-${year}`;

            await this.fileManager.createDir(newPath);
            await this.fileManager.moveFileToDir(fileName,newPath);
        }
    }

    public async groupFilesByExtension() {
        throw new Error('Not implemented');
    }
}

async function main() {
    // const path = '/home/hiram/Documents/my-obsidian-notes/01\ -\ Rough\ Notes/Daily\ Notes';
    // const path = '/Users/hiram/Library/Mobile Documents/iCloud~md~obsidian/Documents/hiram/01 - Rough Notes/Daily Notes'
    const path = './test'

    const app = new App(path, 'es')
    await app.standardizeFileDateNames('yyyy-MM-dd', 'dd-MMM-yyyy');
    await app.organizeFilesByDate('dd-MMM-yyyy')
}

main();

