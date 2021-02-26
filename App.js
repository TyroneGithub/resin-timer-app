/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Layout from "./src/components/Layout";
import Timer from "./src/features/Timer/Timer";

import { Text, Icon } from 'react-native-elements';


const App = () => {
  return (
    <SafeAreaProvider>
      <Layout>
        <Timer/>
      </Layout>
    </SafeAreaProvider>
  );

}

export default App;
