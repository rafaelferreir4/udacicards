// Global Components.
import React, { Component } from 'react'
import { StatusBar, StyleSheet, View, Text } from 'react-native'
import { Constants } from 'expo'

// Redux.
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

// Navigation.
import { Routes } from './routes'

export default class App extends Component {
  render() {
    return (
      <Provider store={ createStore(reducers) }>
        <View style={ styles.container }>
          <View style={ styles.statusBar }>
            <StatusBar
              translucent
              backgroundColor={ styles.statusBar }
              barStyle='light-content'
            />
            <Routes />
          </View>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statusBar: { backgroundColor: '#5ea37c', height: '100%' }
});
