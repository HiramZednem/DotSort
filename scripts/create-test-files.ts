
import { promises as fs } from 'fs';

export async function createTestFiles(path: string) {
    try {
        const testFiles = [
            '2024-01-01.txt', '2024-01-02.txt',
            '2024-02-01.txt', '2024-02-02.txt',
            '2025-03-01.txt', '2025-03-02.txt',
            '2025-03-03.txt', '2025-03-04.txt',
            '2025-04-01.txt', '2025-04-02.txt',
            '2025-04-03.txt', '2025-04-04.txt',
            '2025-05-01.txt', '2025-05-02.txt',
            '2025-05-03.txt', '2025-05-04.txt',
            '2025-06-01.txt', '2025-06-02.txt',
            '2025-06-03.txt', '2025-06-04.txt',
            '2025-07-01.txt', '2025-07-02.txt',
            '2025-07-03.txt', '2025-07-04.txt',
            '2025-08-01.txt', '2025-08-02.txt',
            '2025-08-03.txt', '2025-08-04.txt',
            '2025-09-01.txt', '2025-09-02.txt',
            '2025-09-03.txt', '2025-09-04.txt',
            '2025-10-01.txt', '2025-10-02.txt',
            '2025-10-03.txt', '2025-10-04.txt',
            '2025-11-01.txt', '2025-11-02.txt',
            '2025-11-03.txt', '2025-11-04.txt',
            '2025-12-01.txt', '2025-12-02.txt',
            '2025-12-03.txt', '2025-12-04.txt',
            '2024-11-05.txt', '2024-11-06.txt',
            '2024-12-07.txt', '2024-12-08.txt',
        ];

        await fs.rm(path, { recursive: true, force: true });

        await fs.mkdir(path, { recursive: true });

        testFiles.forEach(async (fileName) => {
            const filePath = `${path}/${fileName}`;
            await fs.writeFile(filePath, `This is a test file for ${fileName}`);
        });

    } catch (error) {
        console.error('Error creating test files:', error);
    }
}

createTestFiles('./test');