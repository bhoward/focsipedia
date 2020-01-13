const evalCode = (code, scope) => {
  // ignores scope...
  const _consoleError = console.error;
  let errs = '';
  console.error = (...args) => {
    return args.forEach(argument => {
      errs += argument + '\n'
    });
  }
  let res = evaluator.execute(code)
  console.error = _consoleError;

  return res + '\n' + errs; // TODO fix this
};

export default evalCode;
