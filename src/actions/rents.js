import { actions, paths } from '../common/constants';

export default {
  getRents: () => ({
    [actions.API_CALL]: {
      types: [
        actions.RENTS_GET_REQUEST,
        actions.RENTS_GET_SUCCESS,
        actions.RENTS_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.RENTS)
    }
  }),

  getRentsTillToday: () => ({
    [actions.API_CALL]: {
      types: [
        actions.RENTS_TILL_TODAY_REQUEST,
        actions.RENTS_TILL_TODAY_SUCCESS,
        actions.RENTS_TILL_TODAY_FAILURE,
      ],
      promise: client => client.get(paths.api.RENTS_TILL_TODAY),
    },
  }),

  getRentsByDate: (date) => ({
    [actions.API_CALL]: {
      types: [
        actions.RENTS_BY_DATE_REQUEST,
        actions.RENTS_BY_DATE_SUCCESS,
        actions.RENTS_BY_DATE_FAILURE,
      ],
      promise: client => client.get(paths.build(paths.api.RENTS_DATE, date)),
    },
  }),
}