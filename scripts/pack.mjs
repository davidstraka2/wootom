import {copy, mkdirs, pathExists} from 'fs-extra';
import {resolve} from 'path';

const distDir = 'dist';

/**
 * Copy file or directory to distDir
 *
 * @param {string} src Path to the file or directory to be copied
 * @param {string} [dest] The path to be resolved from distDir, where should src
 * be copied to. Leave undefined to use the src path.
 * @returns Promise which resolves after the copy operation is finished
 */
async function cp(src, dest) {
    if (!(await pathExists(src))) return;
    if (typeof dest === 'undefined') dest = src;
    await copy(src, resolve(distDir, dest));
}

// Ensure that distDir and any parent directories exist
await mkdirs(distDir);

await Promise.all([
    cp('grammars/'),
    cp('keymaps/'),
    cp('lib/'),
    cp('menus/'),
    cp('settings/'),
    cp('styles/'),
    cp('.gitattributes'),
    cp('.gitignore-dist', '.gitignore'),
    cp('CHANGELOG.md'),
    cp('LICENSE.txt'),
    cp('package.json'),
    cp('README.md'),
]);
