const czConfig = require('./.cz-config.cjs')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', czConfig.types.map((type) => type.value)],
    'subject-case': [0]
  }
}
