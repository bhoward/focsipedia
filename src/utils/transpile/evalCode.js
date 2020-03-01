import React from 'react';

const evalCode = (code, language, hidden) => {
  if (language === 'reason') {
    evaluator.reasonSyntax();
  } else {
    evaluator.mlSyntax();
  }

  let res = '';
  let output = '';
  let errs = '';

  let results = evaluator.execute(code);

  results.forEach(r => {
    let {value, stdout, stderr} = r.value;
    res += value;
    output += stdout;
    errs += stderr;
  });

  let resElt = null;
  if ((res.trim() !== '') && !hidden) {
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
