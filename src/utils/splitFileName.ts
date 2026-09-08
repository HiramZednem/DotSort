

export function splitFileName(fileName: string, datePattern: string): { date: string; restOfName: string } {
    // here i need to identify with a reggex the date pattern to actually split the name
    // extracting the date, the extra part of the name and why do i need the extension?

    // so here i'll use my own implementation just for me, since my file are like
    // date-name.md
    // i'll grab date and -name.md, then with tha i'll create the new name

    "2026-09-07-my_note.md"
    // this idea is crazy but will work, i'll receive the format of the date, count the caracters, and
    // split in that



    const date = fileName.slice(0, datePattern.length);
    const restOfName = fileName.slice(datePattern.length);



    return { date, restOfName };
}