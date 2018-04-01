// Global Components.
import React, { Component } from 'react'
import { AppLoading } from 'expo'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity
} from 'react-native'

// Redux.
import { connect } from 'react-redux'
import { loadDecks } from '../actions'

// Custom Components.
import Deck from './Deck'
import { getDecks } from '../utils/api'

class Decks extends Component {
  state = { ready: false }

  componentDidMount() {
    const { loadDecks } = this.props

    getDecks()
      .then(decks => loadDecks(decks))
      .then(() => this.setState(() => ({ ready: true })))
  }

  keyExtractor = (item, index) => item.title

  onPressItem = item => {
    const { navigation } = this.props

    navigation.navigate('DeckInfo', { deckTitle: item.title })
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={ styles.item }
        onPress={ () => this.onPressItem(item) }
      >
        <Deck id={ item.title } title={ item.title } questions={ item.questions }/>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props
    const listOfDecks = Object.values(decks)

    if (!this.state.ready) { return (<AppLoading/>) }

    return (
      <FlatList
        style={ styles.container }
        data={ listOfDecks }
        extraData={ this.state }
        keyExtractor={ this.keyExtractor }
        renderItem={ this.renderItem }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7'
  }
})

function mapStateToProps(decks) { return { decks } }

export default connect(mapStateToProps, {loadDecks})(Decks)
