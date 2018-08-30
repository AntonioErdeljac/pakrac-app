import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Icon, View } from 'native-base';
import thunk from 'redux-thunk';
import { updateFocus, getCurrentRouteKey } from 'react-navigation-is-focused-hoc'

import { Home, Input, Calendar } from './components';
import { initialRoute } from './common/constants';
import { reducers, middleware } from './store';

const Router = createBottomTabNavigator({
  Home,
  Calendar: Calendar,
  Input: Input,
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Calendar') {
          iconName = 'calendar';
        } else if (routeName === 'Input') {
          iconName = 'new-message';
        }

        return <Icon name={iconName} type="Entypo" size={25} style={focused ? {color: '#ff2f3e'} : {color: 'gray'}} />;
      },
    }),
    resetOnBlur: true,
    backBehavior: 'Home',
    tabBarOptions: {
      swipeEnabled: true,
      animationEnabled: true,
      activeTintColor: '#ff2f3e',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#fff'
      },
    },
  },
{
  initialRouteName: initialRoute,
});

const store = createStore(reducers, applyMiddleware(thunk, middleware()));

const App = () => (
  <Provider store={store}>
    <Router
      onNavigationStateChange={(prevState, currentState) => {
        updateFocus(currentState)
      }}
    />
  </Provider>
);

export default App;
