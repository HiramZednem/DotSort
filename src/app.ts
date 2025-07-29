
/**
 * First, I want the user to select the path where the file are located.
 * 
 * Then I want to read the file name
 * The expected format is: DD-MM-YYYY
 * 
 * if the file has that format, I want to rename it to YYYY-MM-DD
 * 
 * then, I want to add that file to a folder.
 * 
 * I want to create the folder mm(digit)--mm(string)-YY 
 * add the file that matchs the use case
 * 
 */

import { FileManager } from "./core/FileManager";
import { splitFileName } from "./utils/splitFileName";
import { formatDateString } from "./utils/formatDateString";


// TODO: hay un monton de pedos si hay una carpeta adentro... hay que ver como manejarlo
// TODO: si un archivo no tiene el formato de fecha, truena y es un pedo...

async function start() {
    const path = '/Users/hiram/Library/Mobile Documents/iCloud~md~obsidian/Documents/hiram/01 - Rough Notes/Daily Notes';

    const fileManager = new FileManager(path);
    const files = await fileManager.readDirFiles();

    for (let file of files) {
        const {baseName, extension} = splitFileName(file);
        const formattedDate = formatDateString(baseName);
        const newFileName = formattedDate + extension;

        fileManager.renameFile(file, newFileName);
    }
}

start();

