// Global Components.
import React, { Component } from 'react'
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// Redux.
import { connect } from 'react-redux'

// Custom Components.
import Deck from './Deck'
import Card from './Card'

// API.
import { setLocalNotification, clearNotifications } from '../utils/notifications'

class Quiz extends Component {
  state = { currentQuestionIndex: 0, correctAnswersCount: 0 }

  componentDidMount() {
    clearNotifications().then(setLocalNotification)
  }

  countCorrects() {
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      correctAnswersCount: this.state.correctAnswersCount + 1
    })
  }

  countIncorrects() {
    this.setState(state => {
      return {
        ...state,
        currentQuestionIndex: state['currentQuestionIndex'] + 1
      }
    })
  }

  render() {
    const {currentQuestionIndex, correctAnswersCount} = this.state
    const {deck, goBack} = this.props
    const {questions} = deck

    if (currentQuestionIndex > 0 && currentQuestionIndex === questions.length) {
      return (
        <View style={ styles.container }>
          <View style={ styles.scoreContainer }>
            <Text style={ styles.scoreLbl }>Score</Text>
            <Text style={ styles.score }>
              { correctAnswersCount / questions.length * 100 }%
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={ [styles.button, styles.goBackToDeckBtn] }
              onPress={ () => goBack() }
            >
              <Text style={[styles.btnText, styles.goBackToDeckBtnText]}>
                Back to Deck
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.restartQuizBtn]}
              onPress={ () => this.setState({ currentQuestionIndex: 0, correctAnswersCount: 0 }) }
            >
              <Text style={[styles.btnText, styles.restartQuizBtnText]}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const card = questions[currentQuestionIndex]
    const { opacityFront, opacityBack, transformFrontY, transformBackY } = this.state
    const frontAnimatedStyle = { transform: [{ rotateY: this.frontInterpolate }]}
    const backAnimatedStyle = { transform: [{ rotateY: this.backInterpolate }]}

    return (
      <View style={ styles.container }>
        <Text style={ styles.pagination }>
          { currentQuestionIndex + 1 } / { questions.length }
        </Text>
        <View style={ styles.card }>
          <Card card={ card }/>
        </View>
        <View style={ styles.btnContainer }>
          <TouchableOpacity
            style={ [styles.button, styles.greenBtn] }
            onPress={ () => this.countCorrects() }
          >
            <Text style={ [styles.btnText] }>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ [styles.button, styles.redBtn] } onPress={ () => this.countIncorrects() }>
            <Text style={ [styles.btnText] }>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  pagination: { flex: 1, alignItems: 'flex-start' },
  card: { flex: 9, justifyContent: 'center', alignItems: 'center' },
  btnContainer: { flex: 3, justifyContent: 'flex-end', alignItems: 'stretch' },
  button: { padding: 15, height: 60, margin: 5, justifyContent: 'center', borderRadius: 5 },
  greenBtn: { backgroundColor: '#42f4a4' },
  redBtn: { backgroundColor: '#f44183' },
  goBackToDeckBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' },
  goBackToDeckBtnText: { color: '#000' },
  restartQuizBtn: { backgroundColor: '#000' },
  restartQuizBtnText: { color: '#fff' },
  btnText: { color: '#fff', fontSize: 22, textAlign: 'center' },
  scoreContainer: { flex: 7, justifyContent: 'center', alignItems: 'center' },
  scoreLbl: { fontSize: 36, color: '#aaa' },
  score: { fontSize: 48, color: '#42f4a4' }
})

mapStateToProps = (decks, {navigation}) => {
  const { deckTitle } = navigation.state.params

  return { deck: decks[deckTitle] || {} }
}

mapDispatchToProps = (dispatch, { navigation }) => {
  const { deckTitle } = navigation.state.params

  return { goBack: () => navigation.goBack() }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
