import {remove} from 'fs-extra';

// Ensure the script is being called correctly just to be extra safe
if (process.env.npm_package_name !== 'wootom')
    throw new Error(
        `Unexpected npm_package_name "${process.env.npm_package_name}".`,
    );

await Promise.all([
    remove('buildcache/'),
    remove('dist/'),
    remove('lib/'),
    remove('spec/'),
]);
