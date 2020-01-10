const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map(key => scope[key]);
  // eslint-disable-next-line no-new-func
  const res = new Function(...scopeKeys, 'exports', code);
  const _consoleLog = console.log;
  let output = code + '\n';
  console.log = (...args) => {
    return args.forEach(argument => {
      output += argument + '\n'
    });
  }
  res(...scopeValues, {}); // TODO persist the exports?
  console.log = _consoleLog;
  return output;
};

export default evalCode;
