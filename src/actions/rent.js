import { actions, paths } from '../common/constants';

export default {
  getLatestRent: () => ({
    [actions.API_CALL]: {
      types: [
        actions.RENTS_LATEST_GET_REQUEST,
        actions.RENTS_LATEST_GET_SUCCESS,
        actions.RENTS_LATEST_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.RENTS_LATEST)
    }
  }),

  getUpcomingRent: () => ({
    [actions.API_CALL]: {
      types: [
        actions.RENTS_UPCOMING_GET_REQUEST,
        actions.RENTS_UPCOMING_GET_SUCCESS,
        actions.RENTS_UPCOMING_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.RENTS_UPCOMING)
    }
  }),

  createRent: (values) => ({
    [actions.API_CALL]: {
      types: [
        actions.RENTS_CREATE_REQUEST,
        actions.RENTS_CREATE_SUCCESS,
        actions.RENTS_CREATE_FAILURE,
      ],
      promise: client => client.post(paths.api.RENTS, values),
    },
  }),

  selectRent: (rent) => ({ type: actions.RENT_SELECT, rent }),

  getRentById: id => ({
    [actions.API_CALL]: {
      types: [
        actions.RENT_GET_REQUEST,
        actions.RENT_GET_SUCCESS,
        actions.RENT_GET_FAILURE,
      ],
      promise: client => client.get(paths.build(paths.api.RENTS_ID, id)),
    },
  }),

  updateRent: (id, values) => ({
    [actions.API_CALL]: {
      types: [
        actions.RENT_UPDATE_REQUEST,
        actions.RENT_UPDATE_SUCCESS,
        actions.RENT_UPDATE_FAILURE,
      ],
      promise: client => client.put(paths.build(paths.api.RENTS_ID, id), values),
    },
  }),

  deleteRent: id => ({
    [actions.API_CALL]: {
      types: [
        actions.RENT_DELETE_REQUEST,
        actions.RENT_DELETE_SUCCESS,
        actions.RENT_DELETE_FAILURE,
      ],
      promise: client => client.delete(paths.build(paths.api.RENTS_ID, id)),
    },
  })
}