import { serverUrl } from '../config';

export default {
  RENTS: `${serverUrl}/api/v1/rents`,
  RENTS_LATEST: `${serverUrl}/api/v1/rents/latest`,
  RENTS_UPCOMING: `${serverUrl}/api/v1/rents/upcoming`,
  RENTS_TILL_TODAY: `${serverUrl}/api/v1/rents/till_today`,
  RENTS_DATE: `${serverUrl}/api/v1/rents/date/:date`,
  RENTS_ID: `${serverUrl}/api/v1/rents/:id`,
};
