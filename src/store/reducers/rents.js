import { actions } from '../../common/constants';

const initialState = {
  data: [],
  dataTillToday: [],
  isLoading: false,
  dataByDate: []
};

const actionMap = {
  [actions.RENTS_GET_REQUEST]: state => ({ ...state, isLoading: true }),
  [actions.RENTS_GET_SUCCESS]: (state, { result }) => ({ ...state, data: result.data, isLoading: false }),
  [actions.RENTS_GET_FAILURE]: state => ({ ...state, isLoading: false }),

  [actions.RENTS_TILL_TODAY_REQUEST]: state => ({ ...state, isLoading: true }),
  [actions.RENTS_TILL_TODAY_SUCCESS]: (state, { result }) => ({ ...state, isLoading: false, dataTillToday: result.data }),
  [actions.RENTS_TILL_TODAY_FAILURE]: state => ({ ...state, isLoading: false }),

  [actions.RENTS_BY_DATE_REQUEST]: state => ({ ...state, isLoading: true }),
  [actions.RENTS_BY_DATE_SUCCESS]: (state, { result }) => ({ ...state, dataByDate: result.data, isLoading: false }),
  [actions.RENTS_BY_DATE_FAILURE]: state => ({ ...state, isLoading: true }),
};

export default (state = initialState, action) => {
  if(actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
}