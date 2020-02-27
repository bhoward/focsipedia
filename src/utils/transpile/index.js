import transform from './transform';
import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement =
  ({ code = '', language = 'ocaml', hidden = false }, successCallback, errorCallback) => {
    const {mlcode, errors} = transform(code, language);
    successCallback(errorBoundary(evalCode(mlcode, errors, hidden), errorCallback));
  };

