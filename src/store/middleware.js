import axios from 'axios';

import { actions } from '../common/constants';

export default () => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const callAPIAction = action[actions.API_CALL];

  if (typeof callAPIAction === 'undefined' || !callAPIAction.promise) {
    return Promise.resolve()
      .then(() => next(action));
  }

  const { promise, types, ...restParams } = callAPIAction;
  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...restParams, type: REQUEST });

  return promise(axios.create(), dispatch)
    .then(
      result => next({ ...restParams, result, type: SUCCESS }),
      (error) => {
        next({ ...restParams, error, type: FAILURE });
        return Promise.reject(error);
      },
    );
};
