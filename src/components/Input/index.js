import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

import validations from './validations';
import selectors from './selectors';

import actions from '../../actions'
import { Form, Input } from '../../components/common/components';


class Create extends Form {
  constructor() {
    super();

    this.state = {
      errors: {},
      validating: {},
      items: [{}],
      id: undefined,
    }

    this.formId = 'INPUT';
    this.validations = validations;
  }

  componentDidMount() {
    const { navigation, getRentById } = this.props;

    const id = navigation.getParam('id');

    if(id) {
      getRentById(id)
    }
  }

  componentWillReceiveProps(newProps) {
    const { rent, setValues, isFocused, getRentById, navigation } = this.props;

    if(isFocused && !newProps.isFocused) {
      setValues({}, this.formId);
      this.setState({
        id: undefined,
        errors: {},
        validating: {},
        items: [{}],
      });
    }

    if(!isFocused && newProps.isFocused) {
      const newId = newProps.navigation.getParam('id');

      if(newId) {
        getRentById(newId);
      }
    }

    if(!isEqual(rent, newProps.rent) && !isEmpty(newProps.rent)) {
      setValues(newProps.rent, this.formId);
      this.setState({
        id: newProps.rent._id,
        items: newProps.rent.items
      });
    }
  }

  handleSave = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        if(canSubmit) {
          const { values, createRent, getUpcomingRent, getLatestRent, getRentsTillToday, getRents, setValues, updateRent } = this.props;
          const { id } = this.state;

          if (id) {
            updateRent(id, { ...values, date: new Date(values.date).toJSON() })
            .then(() => {
              return Promise.all([
                getUpcomingRent(),
                getLatestRent(),
                getRentsTillToday(),
                getRents(),
              ])
                .then(() => setValues({}, this.formId))
            })
          } else {
            createRent(values)
              .then(() => {
                return Promise.all([
                  getUpcomingRent(),
                  getLatestRent(),
                  getRentsTillToday(),
                  getRents(),
                ])
                  .then(() => setValues({}, this.formId))
              })
          }
        }

        return canSubmit;
      })
  }

  componentWillUmount() {
    this.purgeForm();
  }

  purgeForm() {
    const { setValues } = this.props;

    setValues({}, this.formId);
    this.setState({
      errors: {}
    })
  }

  render(){
    const { values, updateField } = this.props;
    const { items, id } = this.state;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1, height: Dimensions.get('window').height}}>
        <Text style={{ fontFamily: 'Poppins-Bold', color: 'rgba(0,0,0,.8)', fontSize: 28, paddingLeft: 15 }}>Unos najma</Text>
        <View style={{  maxHeight: Dimensions.get('window').height - 250 ,marginTop: 30, width: Dimensions.get('window').width - 25, borderTopLeftRadius: 5, borderTopRightRadius: 5, elevation: 0.6, padding: 12,paddingBottom:30, alignSelf: 'center' }}>
      <ScrollView>
          <DatePicker
            style={{ width: '100%', borderColor: 'gray', borderRadius: 5,  }}
            date={values.date}
            mode="date"
            placeholder="Datum"
            format="YYYY-MM-DD"
            confirmBtnText="Potvrdi"
            cancelBtnText="Odustani"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                fontFamily: 'Poppins-Regular',
                borderRadius: 5,
                borderWidth: 0.6,
                borderColor: 'gray',
              }
            }}
            onDateChange={(date) => {updateField('date', date, this.formId)}}
          />
          <Input
            itemStyle={{ marginTop: 12 }}
            style={{ fontFamily: 'Poppins-Regular'}}
            labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}
            {...this.getFieldProps('location')}
            label="Mjesto postavljanja"
          />
          <Input
            itemStyle={{ marginTop: 12 }}
            style={{ fontFamily: 'Poppins-Regular' }}
            labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}
            {...this.getFieldProps('price')}
            label="Cijena"
          />
          {items.map((item, i) => (
            <View key={i} style={{ marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <React.Fragment>
                <Input
                  itemStyle={{  flex: 1 }}
                  style={{ fontFamily: 'Poppins-Regular' }}
                  labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}
                  {...this.getFieldProps(`items[${i}].name`)}
                  label="Predmet"
                />
                <Input
                  itemStyle={{  flex: 0.5 }}
                  style={{ fontFamily: 'Poppins-Regular' }}
                  labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}
                  {...this.getFieldProps(`items[${i}].amount`)}
                  label="Količina"
                />
              </React.Fragment>
            </View>
            ))}
          <TouchableOpacity
          onPress={() => this.setState({ items: items.concat({}) })}
          style={{ backgroundColor: '#ff2f3e', borderRadius: 5, marginTop: 12, padding: 12, width: '100%' }}>
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#fff', fontSize: 15, textAlign: 'center' }}>Dodaj predmet</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
        <TouchableOpacity
        onPress={() => this.handleSave()}
        style={{ backgroundColor: '#ff2f3e', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, padding: 12, width: Dimensions.get('window').width - 25, alignSelf: 'center' }}>
          <Text style={{ fontFamily: 'Poppins-Regular', color: '#fff', fontSize: 15, textAlign: 'center' }}>{id ? 'Spremi' : 'Stvori'} najam</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  selectors,
  {
    ...actions.forms,
    ...actions.rent,
    ...actions.rents,
  }
)(withNavigationFocus(Create));