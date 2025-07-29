export function splitFileName(fileName: string): { baseName: string; extension: string } {
    const lastDotIndex = fileName.lastIndexOf('.');

    if (lastDotIndex === -1) {
        return { baseName: fileName, extension: '' };
    }

    const baseName = fileName.slice(0, lastDotIndex);
    const extension = fileName.slice(lastDotIndex);

    return { baseName, extension };
}