// Convert from ocaml to reason using refmt
export default (code) => {
  let result = '';
  let errors = '';
  try {
    result = printRE(parseML(code));
  } catch(error) {
    errors = error.message;
  }

  return {code: result, errors: errors};
}