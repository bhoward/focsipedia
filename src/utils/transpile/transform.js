// adapted from https://github.com/reasonml/reasonml.github.io/blob/source/website/playground/try.js
// currently assumes language is reason or ocaml
export default (code, language) => {
  // transpile from reason to ocaml if needed, using refmt
  if (language === 'reason') {
    try {
      code = printML(parseRE(code)) + ';;';
    } catch(error) {
      return {mlcode: '', errors: error.message};
    }
  }

  return {mlcode: code, errors: ''};
}