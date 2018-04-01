// Global Components.
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

// Redux.
import { connect } from 'react-redux'
import { addCard } from '../actions'

// Custom Components.
import FormActions from './FormActions'
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {
  state = { question: '', answer: '', showError: false }

  submitCard = () => {
    const { question, answer } = this.state
    const { addCard, deck, goBack } = this.props

    if (question !== '' && answer !== '') {
      addCard(deck.title, { question, answer })
      addCardToDeck(deck.title, { question, answer })
      goBack()
    } else {
      this.setState({ showError: true })
    }
  }

  resetSubmission = () => {
    this.setState({ question: '', answer: '' })
    this.props.goBack()
  }

  render() {
    const { showError } = this.state
    const { deck } = this.props

    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>{ deck.title }</Text>
        { showError &&
          <Text style={ styles.errorMessage }>Plase insert both question and answer.</Text>
        }
        <TextInput
          style={ styles.textfield }
          editable={ true }
          placeholder="Type the question"
          onChangeText={ question => this.setState({ question }) }
        />
        <TextInput
          style={[ styles.textfield, { height: 160 } ]}
          underlineColorAndroid={ 'transparent' }
          editable={ true }
          maxLength={ 200 }
          multiline={ true }
          placeholder="Type the answer"
          onChangeText={ answer => this.setState({ answer }) }
        />
        <FormActions
          onSubmit={ this.submitCard }
          onCancel={ this.resetSubmission }
          submitBtnText="Add"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { color: '#aaa', fontSize: 20, textAlign: 'center' },
  errorMessage: { color: 'red', textAlign: 'center' },
  textfield: {
    margin: 5,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
})

mapStateToProps = (decks, { navigation }) => {
  const { deckTitle } = navigation.state.params

  return { deck: decks[deckTitle] || {} }
}

mapDispatchToProps = (dispatch, { navigation }) => {
  const { deckTitle } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
