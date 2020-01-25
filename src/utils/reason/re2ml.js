// Convert from reason to ocaml using refmt
export default (code) => {
  let result = '';
  let errors = '';
  try {
    result = printML(parseRE(code));
  } catch(error) {
    errors = error.message;
  }

  return {code: result, errors: errors};
}