import React from 'react';
import {Header, Card} from 'react-native-elements';
import {View, ImageBackground} from 'react-native';

const Layout = ({children}) => {
  // const image = {uri: ''};
  return (
    <>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Header
          leftComponent={{icon: 'settings', color: '#fff'}}
          centerComponent={{
            text: 'RESIN TIMER',
            style: {
              fontFamily: 'FredokaOne-Regular',
              fontSize: 20,
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
          backgroundColor="#248082"
        />
        <ImageBackground
          source={require('../assets/images/sucrose.jpg')}
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          {children}
        </ImageBackground>
      </View>
    </>
  );
};

export default Layout;
