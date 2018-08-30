import { validations } from '../../common/utils';

export default {
  date: value => Promise.resolve(validations.isEmpty(value) ? 'Date is required' : ''),

  location: value => Promise.resolve(validations.isEmpty(value) ? 'Location is required' : ''),

  price: value => {
    let error = '';

    if(validations.isEmpty(value)) {
      error = 'Price is required';
    } else if(!validations.isNumber(value)) {
      error = 'Price must be an integer';
    }

    return Promise.resolve(error);
  }
}