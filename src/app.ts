
import { FileManager } from "./core/FileManager";
import { splitFileName } from "./utils/splitFileName";
import { formatDateString } from "./utils/date-utils";
import { Language } from './types/common';


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
        // TODO: hay un monton de pedos si hay una carpeta adentro... hay que ver como manejarlo
        // TODO: si un archivo no tiene el formato de fecha, truena y es un pedo...
        const files = await this.fileManager.readDirFiles();

        for (let file of files) {
            const {baseName, extension} = splitFileName(file);
            const formattedDate = formatDateString(baseName, currentFormat, targetFormat);
            const newFileName = formattedDate + extension;

            this.fileManager.renameFile(file, newFileName);
        }
    }

    public async organizeFilesByDate() {
        throw new Error('Not implemented');
    }

    public async groupFilesByExtension() {
        throw new Error('Not implemented');
    }
}

async function main() {
    const path = './test';

    const app = new App(path, 'es')
    await app.standardizeFileDateNames()
}

main();

