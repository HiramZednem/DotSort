import { promises as fs } from 'fs';

export class FileManager {
    private path: string;

    constructor(path: string) {
        this.pathExists(path).then( (exists) => {
            if(!exists) throw new Error('Source path does not exist');
        })
        this.path = path;
    }

    public async renameFile(oldName: string, newName: string) {
        const oldPath = this.path + '/' + oldName;
        const newPath = this.path + '/' + newName;
        try {
            if (await this.pathExists(newPath)) {
                console.log(`Destination file: ${newPath}  already exists`);
                return;
            }
           
            await fs.rename(oldPath, newPath);
        } catch (err: any) {
            console.error('Error renaming file:', err);
        }
    };

    public async createDir( dirName: string ) {
        await fs.mkdir(this.path + '/' + dirName, { recursive: true });
    }

    public async moveFileToDir( file: string, dir: string ) {
        const oldPath = this.path + '/' + file;
        const newPath = this.path + '/' + dir + '/' + file;
        try {
            if (await this.pathExists(newPath)) {
                console.log(`Destination file: ${newPath}  already exists`);
                return;
            }

            await fs.rename(oldPath, newPath);
        } catch (err: any) {
            console.error('Error moving file:', err);
        }
    }

    public async readDirFiles() {
        return await fs.readdir(this.path);
    }

    private async pathExists( path: string ): Promise<boolean> {
        try {
            await fs.access(path);
            return true;
        } catch {
            return false;
        }
    }
}

