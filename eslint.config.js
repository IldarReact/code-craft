import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  { 
    ignores: [
      'dist', 
      'node_modules', 
      '.next', 
      '.cache', 
      'build', 
      'out'
    ] 
  },
  
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended,
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      eslintConfigPrettier
    ],
    
    files: ['**/*.{ts,tsx}'],
    
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json'
      }
    },
    
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
      'react': reactHooks
    },
    
    settings: {
      react: {
        version: 'detect'
      }
    },
    
    rules: {
      ...reactHooks.configs.recommended.rules,
      
      'react-refresh/only-export-components': [
        'warn', 
        { allowConstantExport: true }
      ],
      
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      
      'react/prop-types': 'off', // TypeScript заменяет prop-types
      'react/react-in-jsx-scope': 'off' // Не требуется в новых версиях React
    }
  }
)