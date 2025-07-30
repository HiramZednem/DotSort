
import { promises as fs } from 'fs';

export async function createTestFiles(path: string) {
    try {
        // 3 archivos de cada mes del año 2025
        // 3 archivos de enero y febrero del ano 2024
        const testFiles = [
            '01-01-2024.txt', '02-01-2024.txt',
            '01-02-2024.txt', '02-02-2024.txt',
            '01-03-2025.txt', '02-03-2025.txt',
            '03-03-2025.txt', '04-03-2025.txt',
            '01-04-2025.txt', '02-04-2025.txt',
            '03-04-2025.txt', '04-04-2025.txt',
            '01-05-2025.txt', '02-05-2025.txt',
            '03-05-2025.txt', '04-05-2025.txt',
            '01-06-2025.txt', '02-06-2025.txt',
            '03-06-2025.txt', '04-06-2025.txt',
            '01-07-2025.txt', '02-07-2025.txt',
            '03-07-2025.txt', '04-07-2025.txt',
            '01-08-2025.txt', '02-08-2025.txt',
            '03-08-2025.txt', '04-08-2025.txt',
            '01-09-2025.txt', '02-09-2025.txt',
            '03-09-2025.txt', '04-09-2025.txt',
            '01-10-2025.txt', '02-10-2025.txt',
            '03-10-2025.txt', '04-10-2025.txt',
            '01-11-2025.txt', '02-11-2025.txt',
            '03-11-2025.txt', '04-11-2025.txt',
            '01-12-2025.txt', '02-12-2025.txt',
            '03-12-2025.txt', '04-12-2025.txt',
            '05-11-2024.txt', '06-11-2024.txt',
            '07-12-2024.txt', '08-12-2024.txt',
        ];

        // first i'll delete all the files that can be in the path
        await fs.rm(path, { recursive: true, force: true });


        testFiles.forEach(async (fileName) => {
            const filePath = `${path}/${fileName}`;
            await fs.writeFile(filePath, `This is a test file for ${fileName}`);
        });

        console.log('Test files created successfully.');
    } catch (error) {
        console.error('Error creating test files:', error);
    }
}

createTestFiles('./test');