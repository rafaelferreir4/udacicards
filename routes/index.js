// Global Components.
import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

// Custom Components.
import Decks from '../components/Decks'
import AddDeck from '../components/AddDeck'
import DeckInfo from '../components/DeckInfo'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'

// Expo.
import { Entypo } from '@expo/vector-icons'

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) =>
          <Entypo name='list' size={ 30 } color={ tintColor } />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) =>
          <Entypo name='add-to-list' size={ 30 } color={ tintColor } />
      }
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios'? '#aaa' : '#fff',
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? '#fff' : '#aaa',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

export const Routes = StackNavigator({
  Home: { screen: Tabs },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000'
      },
      headerBackTitle: null,
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000'
      },
      headerBackTitle: null,
      title: "Add Card"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000'
      },
      headerBackTitle: null,
      title: "Quiz"
    }
  }
})
