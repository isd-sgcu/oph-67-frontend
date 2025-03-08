const { resolve } = require('node:path')

const project = resolve(__dirname, 'tsconfig.json')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: { project },
  settings: {
    'import/resolver': { typescript: { project } },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowRegExp: false,
        allowNever: false,
      },
    ],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        reservedFirst: true,
      },
    ],
    // sort import statements
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    'import/no-default-export': 'off',
    // sort named imports within an import statement
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
    // allow console.log, etc.
    'no-console': 'off',
    // Disable eslint-comments/require-description rule globally
    'eslint-comments/require-description': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.cjs', '*.mjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    // Varies file convention from libraries, e.g. Next.js App Router and Prettier
    // Must use default export
    {
      files: [
        '*.config.{mjs,ts}',
        'src/app/**/{page,layout,not-found,*error,opengraph-image,apple-icon}.tsx',
        'src/app/**/{sitemap,robots}.ts',
        'src/components/emails/*.tsx',
      ],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': ['error', { target: 'any' }],
      },
    },
    // module declarations
    {
      files: ['**/*.d.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
    // Ignore shadcn UI components
    {
      files: ['src/components/ui/**/*.{ts,tsx}'],
      rules: {
        // Disable all rules for shadcn UI components
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'import/no-default-export': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-sort-props': 'off',
        'react/jsx-no-leaked-render': 'off',
        'import/order': 'off',
        'sort-imports': 'off',
        'react/prop-types': 'off',
        'react/jsx-key': 'off',
        'react/display-name': 'off',
        'react/no-unknown-property': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'no-implicit-coercion': 'off',
        'eslint-comments/require-description': 'off',
      },
    },
  ],
}
