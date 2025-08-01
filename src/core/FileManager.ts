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
        const path = this.path + '/' + dirName;
        if ( await this.pathExists(path)) return;

        await fs.mkdir(path, { recursive: true });
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
        const dirElements = await fs.readdir(this.path, { withFileTypes: true } );

        return dirElements.filter(dirElement => dirElement.isFile())
                          .map(dirElement => dirElement.name);
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

