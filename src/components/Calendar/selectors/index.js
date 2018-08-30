import moment from 'moment';

const getMarkedDates = (state) => {
  const markedDates = {};

  state.rents.data.forEach((rent) => {
    markedDates[moment(rent.date).format('YYYY-MM-DD')] = {
      selected: true,
      marked: true,
      selectedColor: moment(rent.date).isBefore() ? undefined : '#ff2f3e',
      customStyles: moment(rent.date).isBefore() ? {
        container: {
          backgroundColor: 'white',
          borderColor: '#ff2f3e',
          borderWidth: 0.5
        },
      } : {}
    };
  });

  return markedDates;
}

export default state => ({
  rents: state.rents.data,
  markedDates: getMarkedDates(state),
  rentsByDate: state.rents.dataByDate,
});