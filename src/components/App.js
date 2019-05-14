import React, { Component } from 'react';

import { createSwitchNavigator } from 'react-navigation';

import List from './List'
import Append from './Append'

import Update from './Update'

const App = createSwitchNavigator({
  List: { screen: List },
  Append: { screen: Append },
  Update: { screen: Update }
});
 
export default App;