// Global Components.
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

class FormActions extends Component {
  render() {
    const { onSubmit, onCancel } = this.props

    return (
      <View style={ styles.row }>
        <TouchableOpacity
          style={[ styles.button, styles.cancelButton ]}
          onPress={ onCancel }
        >
          <Text style={ styles.buttonText }>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ styles.button ]} onPress={ onSubmit }>
          <Text style={ styles.buttonText }>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
  cancelButton: { backgroundColor: '#ddd' },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 20 },
  button: { flex: 1, backgroundColor: '#333', height: 40, margin: 5, padding: 10, borderRadius: 5 },
})

export default FormActions
