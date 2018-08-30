import Modal from "react-native-modal";
import React from 'react';
import moment from 'moment';
import 'moment/locale/hr'
import { Icon } from 'native-base'
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

moment.locale('hr')

import selectors from './selectors';

import actions from '../../actions';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { getUpcomingRent, getLatestRent, getRentsTillToday } = this.props;

    getUpcomingRent()
    getLatestRent()
    getRentsTillToday()
  }

  render(){
    const { upcomingRent, latestRent, totalEarnings, rentsByDate, selectRent } = this.props;
    const { showModal } = this.state;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Modal isVisible={showModal}>
          <View style={{ padding: 16, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
            {rentsByDate.map((rent) => (
              <TouchableOpacity onPress={() => selectRent(rent).then(() => this.setState({ showModal: false }))} key={rent._id} style={{ padding: 15, backgroundColor: '#ff2f3e', borderRadius: 5, marginTop: 5, marginBottom: 5 }}>
                <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 17 }}>{rent.location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        <Text style={{ fontFamily: 'Poppins-Bold', color: 'rgba(0,0,0,.8)', fontSize: 28, paddingLeft: 15 }}>Početna</Text>
        <View style={{ flex: 1, display: 'flex' , justifyContent: 'flex-start', flexDirection: 'column'}}>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: 12, alignItems: 'flex-start' }}>
        <View style={{ paddingLeft: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, marginRight: 20 }}>
          <View style={{ display:'flex', justifyContent: 'center', alignItems: 'center', elevation: 0.6, borderRadius: 5, padding: 12, height: 150,  }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#000', fontSize: 16, textAlign: 'center' }}>Sljedeći najam:</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#ff2f3e', textAlign: 'center', fontSize: 20 }}>{!isEmpty(upcomingRent) ? moment(upcomingRent.date).format('DD.MM.YYYY') : 'Nema'}</Text>
            {!isEmpty(upcomingRent) && <Text style={{ fontFamily: 'Poppins-Medium', color: '#ff2f3e', textAlign: 'center', fontSize: 20, }}>({!isEmpty(upcomingRent) ? moment(upcomingRent.date).locale('hr').format('dddd') : 'Nema'})</Text>}
          </View>
          <TouchableOpacity onPress={() => this.setState({ showModal: true })} style={{ alignSelf: 'center', backgroundColor: '#ff2f3e', padding: 8, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
            <Text style={{fontFamily: 'Poppins-Medium', color: '#fff'}}>{rentsByDate.length}</Text>
          </TouchableOpacity>
        </View>
          <View style={{ display:'flex', justifyContent: 'center', alignItems: 'center', elevation: 0.6, borderRadius: 5, padding: 12, height: 150, flex: 1, }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#000', fontSize: 16 }}>Mjesto</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#000', fontSize: 16 }}>postavljanja:</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#ff2f3e', textAlign: 'center', fontSize: 20 }}>{!isEmpty(upcomingRent) ? upcomingRent.location : 'Nema'}</Text>
          </View>
        </View>
        <View style={{  display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: 12 }}>
          <View style={{ display:'flex', justifyContent: 'center', alignItems: 'center',elevation: 0.6, borderRadius: 5, padding: 12, height: 150, flex: 1, marginRight: 20 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#000', fontSize: 16 }}>Oprema:</Text>
            <ScrollView style={{ width: '100%' }}>
            {!isEmpty(upcomingRent) && upcomingRent.items && upcomingRent.items.map((item, i) => (
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
          </View>
          <View style={{ display:'flex', justifyContent: 'center', alignItems: 'center', elevation: 0.6, borderRadius: 5, padding: 12, height: 150, flex: 1, }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#000', fontSize: 20 }}>Cijena:</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#ff2f3e', textAlign: 'center', fontSize: 20 }}>{!isEmpty(upcomingRent) ? `${upcomingRent.price}HRK` : 'Nema'}</Text>
          </View>
          </View>
          <View style={{ backgroundColor: '#ff2f3e', padding: 12, borderRadius: 5, width: Dimensions.get('window').width-25, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#fff', fontSize: 18 }}>Zarada do danas:</Text>
            <Text style={{ fontFamily: 'Poppins-Bold', color: '#fff', fontSize: 20 }}>{totalEarnings}HRK</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  selectors,
  {
    ...actions.rent,
    ...actions.rents,
  }
)(Home);