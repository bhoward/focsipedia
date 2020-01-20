const evalCode = (code, canvas) => {
  if (canvas !== '') {
    console.log(canvas);
    evaluator.execute('let _ = Graphics_js.open_canvas(Js_of_ocaml.Js.Opt.get(Js_of_ocaml.Dom_html.CoerceTo.canvas(Js_of_ocaml.Dom_html.getElementById(("' + canvas + '")[@reason.raw_literal "' + canvas + '"])))(fun ()  -> raise Not_found));;');
  }
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
