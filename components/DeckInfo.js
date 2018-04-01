// Global Components.
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// Redux.
import { connect } from 'react-redux'

// Custom Components.
import Deck from './Deck'

class DeckInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return { title: deckTitle }
  }

  render() {
    const { deck, navigateToAddCard, navigateToStartQuiz } = this.props

    return (
      <View style={ styles.container }>
        <Deck
          id={ deck.title }
          title={ deck.title }
          questions={ deck.questions }
          bigFonts={ true }
        />
        <TouchableOpacity
          style={[ styles.button, styles.addCardBtn ]}
          onPress={ () => navigateToAddCard(deck.title) }
        >
          <Text style={[ styles.btnText, styles.addCardBtnText ]}>
            Add a new card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ styles.button, styles.startQuizBtn ]}
          onPress={() => navigateToStartQuiz(deck.title)}
        >
          <Text style={ [styles.btnText, styles.startQuizBtnText] }>
            Play the quiz
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  addCardBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' },
  addCardBtnText: { color: '#000' },
  startQuizBtn: { backgroundColor: '#000' },
  startQuizBtnText: { color: '#fff' },
  btnText: { color: '#fff', fontSize: 22, textAlign: 'center' },
  button: { padding: 15, height: 60, margin: 5, borderRadius: 5, justifyContent: 'center' },
})

mapStateToProps = (decks, { navigation }) => {
  const { deckTitle } = navigation.state.params

  return { deck: decks[deckTitle] || {}, decks }
}

mapDispatchToProps = (dispatch, { navigation }) => {
  const { deckTitle } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    navigateToAddCard: deckTitle => navigation.navigate(
      'AddCard',
      { deckTitle }
    ),
    navigateToStartQuiz: deckTitle => navigation.navigate(
      'Quiz',
      { deckTitle }
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckInfo)
