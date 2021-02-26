import React from 'react';
import { Header, Card } from 'react-native-elements';
import { View } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View>
      <Header 
        leftComponent={{ icon:'settings', color:'#fff' }}
        centerComponent={{ text: 'RESIN TIMER', style:{color:'#fff', fontWeight:'bold'} }}
      />
      {children}
    </View>
  );
}

export default Layout
