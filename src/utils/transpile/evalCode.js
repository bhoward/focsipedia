import React from 'react';

const evalCode = (code, prevErrors) => {
  const _consoleLog = console.log;
  const _consoleError = console.error;
  let output = '';
  let errs = prevErrors;
  let res = '';

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
  res = evaluator.execute(code);
  console.log = _consoleLog;
  console.error = _consoleError;

  let resElt = null;
  if (res.trim() !== '') {
    resElt = <pre style={{color: "green"}}>{res}</pre>;
  }

  let outElt = null;
  if (output !== '') {
    outElt = <pre dangerouslySetInnerHTML={{ __html: output }} />
  }

  let errElt = null;
  if (errs !== '') {
    errElt = <pre style={{color: "red"}}>{errs}</pre>;
  }

  return <div>
    {resElt}
    {(resElt !== null && outElt !== null) ? <hr/> : null}
    {outElt}
    {((resElt !== null || outElt !== null) && errElt !== null) ? <hr/> : null}
    {errElt}
    </div>;
};

export default evalCode;
