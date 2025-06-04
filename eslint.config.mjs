// import globals from "globals";
// import pluginJs from "@eslint/js";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginNode from 'eslint-plugin-node';
import pluginNodeRecommended from 'eslint-plugin-node/configs/recommended';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config} */
export default [
  {
    // Configuración para el navegador (si tienes código front-end)
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021, // Agrega soporte para ES2021
      },
      parserOptions: {
        sourceType: 'module', // Asegura que se reconozcan los módulos ES
      },
    },
    ...pluginJs.configs.recommended,
  },
  {
    // Configuración para Node.js (tu API)
    files: ['**/*.js', '**/*.mjs'], // Aplica las reglas a todos los archivos .js y .mjs
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021, // Agrega soporte para ES2021
      },
      parserOptions: {
        ecmaVersion: 12, // O el valor más reciente que admita Node.js
        sourceType: 'module',
      },
    },
    plugins: {
      node: pluginNode,
      prettier: pluginPrettier, // Agrega Prettier como plugin
    },
    extends: [
      ...pluginNodeRecommended.extends, // Extiende la configuración recomendada de eslint-plugin-node
      pluginPrettierRecommended, // Agrega Prettier como plugin
    ],
    rules: {
      // Aquí puedes personalizar las reglas según tus preferencias
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-console': 'warn',
      'node/exports-style': ['error', 'module.exports'], // Asegura que se use module.exports en CommonJS
      'node/file-extension-in-import': ['error', 'always'], // Requiere extensiones de archivo en imports
      'node/no-missing-import': 'error', // Detecta imports faltantes
      'node/no-unpublished-import': 'off', // Puedes habilitar esto si tienes imports de paquetes no publicados
      'node/no-unsupported-features/es-syntax': ['error', { version: '>=12.0.0' }], // Asegura compatibilidad con la versión de Node.js
      'prettier/prettier': 'error', // Habilita las reglas de Prettier como errores
    },
  },
];