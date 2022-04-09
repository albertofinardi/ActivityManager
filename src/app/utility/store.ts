import {
	BaseDirectory,
	createDir,
    readTextFile,
    writeFile,
} from '@tauri-apps/api/fs';

export const createDataFolder = async () => {
	try {
		await createDir('data', {
			dir: BaseDirectory.App,
			recursive: true
		});
	} catch (e) {
		console.error(e);
	}
};

export const saveDataFile = async (content : any, fn : string) => {
	try {
        const _content = JSON.stringify(content)
        await createDataFolder();
		await writeFile(
			{
				contents: _content,
				path: `./data/${fn}.json`
			},
			{
				dir: BaseDirectory.App,
			}
		);
	} catch (e) {
		console.log(e);
	}
};

export const readDataFile = async (fn : string) => {
	try {
        await createDataFolder();
		const res = await readTextFile(`./data/${fn}.json`,
			{
				dir: BaseDirectory.App,
			}
		);
        return JSON.parse(res);
	} catch (e) {
		console.log(e);
        return null
	}
};