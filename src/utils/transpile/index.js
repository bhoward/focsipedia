import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement =
  ({ code = '', language = 'ocaml', hidden = false }, successCallback, errorCallback) => {
    successCallback(errorBoundary(evalCode(code, language, hidden), errorCallback));
  };

