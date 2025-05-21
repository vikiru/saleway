import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import noSecrets from 'eslint-plugin-no-secrets';
import perfectionist from 'eslint-plugin-perfectionist';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import { dirname } from 'path';
import * as reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default tseslint.config(
    ...compat.extends(
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:diff/diff',
    ),
    reactHooks.configs['recommended-latest'],
    perfectionist.configs['recommended-natural'],
    tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            js,
            'no-secrets': noSecrets,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'off',
            '@/no-undef': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'off',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'no-secrets/no-secrets': 'error',
            'perfectionist/sort-objects': 'off',
            'perfectionist/sort-union-types': 'off',
            'perfectionist/sort-object-types': 'off',
        },
    },
    globalIgnores([
        'build/**/*',
        'dist/**/*',
        '.vscode/**/*',
        'node_modules/**/*',
        '.github/**/*',
        '.husky/**/*',
        'public/**/*',
        'generated/**/*',
        '**/**/*.json',
        '**/**/*.md',
        '**/**/*.prisma',
        'services/cart/prisma/**/*',
        'services/order/**/*',
        'services/payment/**/*',
        'services/user/**/*',
        'services/product/**/*',
        '**/**/*.java',
        '**/**/*.py',
        '*.mjs',
        '*.config.js',
        '*.css',
        '*.xml',
        '*.html',
        '*.ico',
        '.env',
        '.env.sample',
        '.gitignore',
        '.prettierignore',
        '**/**/README.md',
    ]),
);
