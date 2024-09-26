export const controlValidation = {
  defaultMinLength: 3,
  defaultMaxLength: 250,
  input: {
    pattern: '^[a-zA-Z0-9_ ]*$',
    patternKey: 'app.regxPatterns.input',
  },
  inputSpecial: {
    pattern: '^[a-zA-Z0-9_, ./-]*$',
    patternKey: 'app.regxPatterns.inputSpecial',
  },
  numeric: {
    minLength: 1,
    maxLength: 100,
    patternKey: 'app.regxPatterns.numeric',
  },
  password: {
    minLength: 8,
    maxLength: 16,
    patternKey: 'app.regxPatterns.password',
  },
};
