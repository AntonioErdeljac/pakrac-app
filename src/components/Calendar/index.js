import React from 'react';
import moment from 'moment/src/moment';
import Modal from "react-native-modal";
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Calendar as NativeCalendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';

import selectors from './selectors';

import actions from '../../actions';

LocaleConfig.locales['hr'] = {
  monthNames: ['Siječanj','Veljača','Ožujak','Travanj','Svibanj','Lipanj','Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'],
  monthNamesShort: ['Sij','Velj','Ožu','Trav','Svib','Lip','Srp','Kol','Ruj','List','Stud','Pros'],
  dayNames: ['Nedjelja', 'Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak','Subota'],
  dayNamesShort: ['Ned', 'Pon','Uto','Sri','Čet','Pet','Sub']
};

LocaleConfig.defaultLocale = 'hr';

class Calendar extends React.Component {
  constructor(){
    super();

    this.state = {
      showModal: false,
      selectedRent: undefined,
    }
  }

  componentDidMount() {
    const { getRents } = this.props;

    getRents();
  }

  selectRent = (rent) => {
    this.setState({
      selectedRent: rent
    });
  }

  render(){
    const { rents, markedDates, getRentsByDate, rentsByDate, navigation, deleteRent, getUpcomingRent, getLatestRent, getRentsTillToday, getRents } = this.props;
    const { showModal, selectedRent } = this.state;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Modal onModalHide={() => this.setState({ selectedRent: undefined, showModal: false })} isVisible={showModal}>
          <View style={{ padding: 16, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
            <View style={{ alignSelf: 'flex-end', marginBottom: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ showModal: false })}>
                <Icon style={{ fontSize: 16, color: '#ff2f3e', textAlign: 'right' }} name="close" type="FontAwesome" />
              </TouchableOpacity>
            </View>
            {selectedRent && (
              <View style={{ alignItems: 'flex-start', width: '100%' }}>
                <Text style={{ fontSize: 16, color: 'gray', fontFamily: 'Poppins-Regular' }}>{selectedRent.location}</Text>
                <Text style={{ fontSize: 16, color: 'gray', fontFamily: 'Poppins-Regular' }}>{selectedRent.price}HRK</Text>
                <Text style={{ fontSize: 16, color: 'gray', fontFamily: 'Poppins-Regular' }}>{moment(selectedRent.date).format('MM.DD.YYYY')}</Text>
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'flex-start' }}>
                {selectedRent.items && selectedRent.items.map((item, i) => (
                  <View key={i} style={{ marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 5, paddingLeft: 12, paddingRight: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff2f3e' }}>
                      <Text style={{ fontFamily: 'Poppins-Medium', color: '#fff', fontSize: 12 }}>{item.amount}</Text>
                    </View>
                    <View style={{ marginLeft: 2, borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 5, paddingLeft: 12, paddingRight: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff2f3e' }}>
                      <Text style={{ fontFamily: 'Poppins-Medium', color: '#fff', fontSize: 12 }}>{item.name}</Text>
                    </View>
                  </View>
                ))}
                </ScrollView>
                <View style={{ width: '100%' ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    showModal: false,
                    selectedRent: undefined
                  }, () => {
                    navigation.navigate('Input', { id: selectedRent._id })
                  })
                }}
                  style={{ backgroundColor: '#ff2f3e', padding: 12, borderRadius: 5, marginTop: 20 }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', color: '#fff' }}>Uredi</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    showModal: false,
                    selectedRent: undefined
                  }, () => {
                    deleteRent(selectedRent._id)
                      .then(() => {
                        Promise.all([
                          getUpcomingRent(),
                          getLatestRent(),
                          getRentsTillToday(),
                          getRents(),
                        ])
                      })
                  })
                }}
                  style={{ backgroundColor: '#ff2f3e', padding: 12, borderRadius: 5, marginTop: 20 }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', color: '#fff' }}>Izbriši</Text>
                </TouchableOpacity>
                </View>
              </View>
            )}
            {!selectedRent && rentsByDate.map((rent) => (
              <TouchableOpacity onPress={() => {
                  this.selectRent(rent)
                }}
                key={rent._id}
                style={{ padding: 15, backgroundColor: '#ff2f3e', borderRadius: 5, marginTop: 5, marginBottom: 5 }}
              >
                <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 17 }}>{rent.location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        <Text style={{ fontFamily: 'Poppins-Bold', color: 'rgba(0,0,0,.8)', fontSize: 28, paddingLeft: 15 }}>Kalendar</Text>
        <View style={{ marginTop: 30 }}>
          <NativeCalendar
            theme={{
              todayTextColor: '#ff2f3e',
              arrowColor: '#ff2f3e',
              monthTextColor: '#ff2f3e',
              textDayFontFamily: 'Poppins-Light',
              textMonthFontFamily: 'Poppins-Light',
              textDayHeaderFontFamily: 'Poppins-Light',
              textMonthFontWeight: 'bold',
              dotColor: '#ff2f3e',
              selectedDotColor: '#ff2f3e',
            }}
            markedDates={markedDates}
            onDayPress={(day) => getRentsByDate(new Date(day.dateString).toJSON()).then(({ result }) => !isEmpty(result.data) && this.setState({ showModal: true }))}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  selectors,
  {
    ...actions.rents,
    ...actions.rent,
  }
)(Calendar);