import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StudentList from './src/postlogin/StudentList'
import Login from './src/prelogin/Login'
import Navigator from './src/Navigation/Navigator'

const App = () => {
  return (
    <View style={styles.container}>
      <Navigator/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})