module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    globals: {
        atom: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['src/lib/tsconfig.json', 'src/spec/tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },

    overrides: [
        {
            files: ['src/spec/**/*'],
            env: {
                jasmine: true,
            },
            globals: {
                advanceClock: true,
                fakeClearInterval: true,
                fakeSetInterval: true,
                waitsForPromise: true,
            },
        },
    ],
};
