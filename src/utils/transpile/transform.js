// adapted from https://github.com/reasonml/reasonml.github.io/blob/source/website/playground/try.js
// currently assumes language is js, reason, or ocaml
export default (code, language) => {
  if (language === 'js') {
    return {jscode: code, errors: ''};
  }

  // first transpile from reason to ocaml if needed, using refmt
  if (language === 'reason') {
    try {
      code = printML(parseRE(code));
    } catch(error) {
      return {jscode: '', errors: error.message};
    }
  }

  // now compile ocaml to javascript, using bucklescript
  const _consoleError = console.error;
  let errs = '';
  console.error = (...args) => {
    return args.forEach(argument => {
      errs += argument + '\n'
    });
  }
  let res = ocaml.compile_super_errors_ppx_v2(code); // TODO maybe just ocaml.compile?
  console.error = _consoleError;
  let startPadding = /^  /gm;
  let noFileName = /\(No file name\)/gm;
  errs = errs
    .replace(startPadding, '')
    .replace(noFileName, 'Playground')
  return {jscode: res.js_code || '', errors: errs};
}

// TODO check for an expression (compiles to nothing)
// and handle it differently -- automatically print?
// What about something resulting in an element (e.g., SVG)?
