import transform from './transform';
import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement =
  ({ code = '', language = 'ocaml', canvas = '' }, successCallback, errorCallback) => {
  const {mlcode, errors} = transform(code, language);
  if (mlcode !== '') {
    successCallback(errorBoundary(evalCode(mlcode, canvas), errorCallback));
  } else {
    errorCallback(errors)
  }
};

