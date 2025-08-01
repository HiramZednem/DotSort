
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
        const files = await this.fileManager.readDirFiles();

        for (let file of files) {
            const {baseName, extension} = splitFileName(file);

            let formattedDate;
            try {
                formattedDate = formatDateString(baseName, currentFormat, targetFormat).toLowerCase();
            } catch {
                continue;
            }
            const newFileName = formattedDate + extension;

            await this.fileManager.renameFile(file, newFileName);
        }
    }

    public async organizeFilesByDate(currentFormat: string = 'yyyy-MM-dd' ) {
        const files = await this.fileManager.readDirFiles();
    
        for (let file of files) {
            const { baseName } = splitFileName(file);

            let date;
            try {
                date = getDateByFormat(baseName, currentFormat);
            } catch {
                continue;
            }

            const monthIndex = date.getMonth();
            const monthIndexHumanFormat = (monthIndex+1).toString().padStart(2, '0');; 
            const monthName = getMonthName(monthIndex);
            const year = date.getFullYear();

            const newPath = `${year}/${monthIndexHumanFormat}-${monthName}-${year}`;

            await this.fileManager.createDir(newPath);
            await this.fileManager.moveFileToDir(file,newPath);
        }
    }

    public async groupFilesByExtension() {
        throw new Error('Not implemented');
    }
}

async function main() {
    const path = './test';
    // const path = '/Users/hiram/Library/Mobile Documents/iCloud~md~obsidian/Documents/hiram/01 - Rough Notes/Daily Notes'

    const app = new App(path, 'es')
    await app.standardizeFileDateNames('dd-MM-yyyy', 'dd-MMM-yyyy');
    await app.organizeFilesByDate('dd-MMM-yyyy')
}

main();

