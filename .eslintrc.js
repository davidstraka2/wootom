module.exports = {
    root: true,
    env: {
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['src/lib/tsconfig.json', 'src/spec/tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
