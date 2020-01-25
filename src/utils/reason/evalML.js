// Evaluate ocaml top-level statements in the current repl.
// Uses evaluator from js_of_ocaml
export default (code) => {
  let result = '';
  let output = '';
  let errors = '';

  if (!code.endsWith(';;')) {
    code = code + ';;';
  }

  const _consoleLog = console.log;
  const _consoleError = console.error;

  console.log = (...args) => {
    return args.forEach(arg => {
      output += arg + '\n'
    });
  };

  console.error = (...args) => {
    return args.forEach(arg => {
      errors += arg + '\n'
    });
  };

  try {
    result = evaluator.execute(code);
  } catch (error) {
    errors += error;
  }

  console.log = _consoleLog;
  console.error = _consoleError;

  return {result: result, output: output, errors: errors};
};
