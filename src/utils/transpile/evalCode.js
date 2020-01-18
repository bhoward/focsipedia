const evalCode = (code, scope) => {
  // ignores scope...
  const _consoleLog = console.log;
  const _consoleError = console.error;
  let output = '';
  let errs = '';
  console.log = (...args) => {
    return args.forEach(argument => {
      output += argument + '\n'
    });
  };
  console.error = (...args) => {
    return args.forEach(argument => {
      errs += argument + '\n'
    });
  };
  let res = evaluator.execute(code);
  console.log = _consoleLog;
  console.error = _consoleError;

  return res + '\n' + output + '\n' + errs; // TODO fix this
};

export default evalCode;
