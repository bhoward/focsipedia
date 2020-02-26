import React from 'react';

const evalCode = (code, canvas) => {
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

  let sampleSVG = `<svg viewBox="0 0 300 100" stroke="red" fill="grey">
    <circle cx="50" cy="50" r="40" />
    <circle cx="150" cy="50" r="8" />

    <svg viewBox="0 0 10 10" x="200" width="100">
      <circle cx="5" cy="5" r="4" />
    </svg>
  </svg>`;

  let resElt = null;
  if (res.trim() !== '') {
    resElt = <pre>{res}</pre>;
  }

  let outElt = null;
  if (output !== '') {
    outElt = (canvas)
      ? <div dangerouslySetInnerHTML={{ __html: output }} />
      : <pre style={{color: "blue"}}>{output}</pre>;
  }

  let errElt = null;
  if (errs !== '') {
    errElt = <pre style={{color: "red"}}>{errs}</pre>;
  }

  // return (res + '\n' + output + '\n' + errs).trim(); // TODO fix this
  return <div>
    {resElt}
    <hr/>
    {outElt}
    <hr/>
    {errElt}
    </div>;
};

export default evalCode;
