import { actions } from '../../common/constants';

const initialState = {
  latestData: {},
  upcomingData: {},
  dataByDate: [],
  isLoading: false,
  amountOfUpcomingData: 0,
  data: {},
};

const actionMap = {
  [actions.RENTS_LATEST_GET_REQUEST]: state => ({ ...state, isLoading: true }),
  [actions.RENTS_LATEST_GET_SUCCESS]: (state, { result }) => ({ ...state, latestData: result.data, isLoading: false }),
  [actions.RENTS_LATEST_GET_FAILURE]: state => ({ ...state, isLoading: false }),

  [actions.RENTS_UPCOMING_GET_REQUEST]: state => ({ ...state, isLoading: true }),
  [actions.RENTS_UPCOMING_GET_SUCCESS]: (state, { result }) => ({ ...state, upcomingData: result.data.upcomingRent, dataByDate: result.data.rentsByDate,  isLoading: false }),
  [actions.RENTS_UPCOMING_GET_FAILURE]: state => ({ ...state, isLoading: false }),

  [actions.RENT_SELECT]: (state, { rent }) => ({ ...state, upcomingData: rent, }),

  [actions.RENT_GET_REQUEST]: state => ({ ...state, isLoading: true }),
  [actions.RENT_GET_SUCCESS]: (state, { result }) => ({ ...state, isLoading: false, data: result.data }),
  [actions.RENT_GET_FAILURE]: state => ({ ...state, isLoading: false }),
};

export default (state = initialState, action) => {
  if(actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
}