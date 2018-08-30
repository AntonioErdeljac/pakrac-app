import { sumBy } from 'lodash';

export default state => ({
  upcomingRent: state.rent.upcomingData,
  latestRent: state.rent.latestData,
  rentsByDate: state.rent.dataByDate,
  totalEarnings: sumBy(state.rents.dataTillToday.map(data => ({ ...data, price: parseInt(data.price) })), 'price'),
})