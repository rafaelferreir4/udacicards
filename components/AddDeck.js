// Global Components.
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

// Redux.
import { connect } from 'react-redux'
import { addDeck } from '../actions'

// Custom Components.
import FormActions from './FormActions'
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {
  state = { title: '', showError: false }

  submitDeck = () => {
    const { title } = this.state
    const { addDeck } = this.props

    if (title !== '') {
      addDeck(title)
      saveDeckTitle(title)
      this.toHome()
    } else {
      this.setState({ showError: true })
    }
  }

  resetSubmission = () => {
    this.setState({ title: '' })
    this.toHome()
  }

  toHome() {
    const { navigation } = this.props

    navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  render() {
    const { showError } = this.state

    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Deck Title</Text>
        { showError &&
          <Text style={ styles.errorMessage }>Plase insert a title.</Text>
        }
        <TextInput
          underlineColorAndroid={ 'transparent' }
          style={ styles.textfield }
          editable={ true }
          maxLength={ 50 }
          placeholder="Deck Title"
          onChangeText={ title => this.setState({ title }) }/>
        <FormActions
          onSubmit={ this.submitDeck }
          onCancel={ this.resetSubmission }
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
    borderRadius: 5,
  }
})

mapStateToProps = decks => decks

export default connect(mapStateToProps, { addDeck })(AddDeck)
