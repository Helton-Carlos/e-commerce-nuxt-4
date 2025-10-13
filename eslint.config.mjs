import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
 {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'off',
      'vue/multi-word-component-names': 'off', 
    }
  },
)
