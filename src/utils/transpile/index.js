import transform from './transform';
import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement = ({ code = '', language = 'ocaml', canvas = '' }, errorCallback) => {
  const transformed = transform(code, language).mlcode;
  return errorBoundary(evalCode(transformed, canvas), errorCallback);
};

