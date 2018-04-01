// Global Components.
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

class Deck extends Component {
  render() {
    const { title, questions, bigFonts } = this.props

    return (
      <View style={ styles.container }>
        <Text style={[ styles.title, bigFonts ? { fontSize: 60 } : '' ]}>
          { title }
        </Text>
        <Text style={[ styles.count, bigFonts ? { fontSize: 32 } : '' ]}>
          { questions.length } card{ questions.length === 1 ? '' : 's' }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  title: { color: '#333', fontSize: 24, textAlign: 'center' },
  count: { color: '#999', fontSize: 16, textAlign: 'center' }
})

export default Deck
