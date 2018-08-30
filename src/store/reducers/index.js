import { combineReducers } from 'redux';

import authentication from './authentication';
import forms from './forms';
import rent from './rent';
import rents from './rents';

export default combineReducers({
  authentication,
  forms,
  rents,
  rent,
});
