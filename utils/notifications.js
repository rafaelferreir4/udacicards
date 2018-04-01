// Global Components.
import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'rafaelferreir4.notifications'

export const clearNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => {
  return {
    title: 'It\'s time to play!',
    body: 'What about playing a game to keep your brain busy?',
    ios: { sound: true },
    android: { sound: true, sticky: false, vibrate: true }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()

          let date = new Date()
          date.setDate(date.getDate() + 1)
          date.setHours(21)
          date.setMinutes(30)

          Notifications.scheduleLocalNotificationAsync(createNotification(), { time: date, repeat: 'day' })
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}
