import { get } from 'lodash';
import { actions } from '../../common/constants';

const initialState = {
  hasRegistered: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.AUTHENTICATION_REGISTRATION_REQUEST]: state => ({ ...state, isSubmitting: true, hasRegistered: false }),
  [actions.AUTHENTICATION_REGISTRATION_SUCCESS]: state => ({ ...state, isSubmitting: false, hasRegistered: true }),
  [actions.AUTHENTICATION_REGISTRATION_FAILURE]: state => ({ ...state, isSubmitting: false, hasRegistered: false }),
};

export default (state = initialState, action) => {
  if ([401, 403].includes(get(action, 'error.response.status'))) {
    // add redirect
  }

  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
