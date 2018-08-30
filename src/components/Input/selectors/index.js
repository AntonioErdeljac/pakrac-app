import { get } from 'lodash';

export default state => ({
  values: get(state, `forms.data.${'INPUT'}.values`, {}),
  isSubmitting: false,
  rent: state.rent.data,
})