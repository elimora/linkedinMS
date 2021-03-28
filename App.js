import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants' ;
import Home from "./screens/Home";
import CreateEmployee from "./screens/CreteEmployee";
import Profile  from "./screens/Profile";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const myOptions={
  title:"Linkedin", 
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"blue"
    }
}

function App() {
 
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={myOptions}
        />
        <Stack.Screen 
        name="Create"
        component={CreateEmployee}
        options={{...myOptions,title:"Creando Empleado"}} 
        />
        <Stack.Screen
        name="Profile" 
        component={Profile} 
        options={{...myOptions,title:"Mi perfil Linkedin"}} 
        />
        {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
    </Stack.Navigator>
    </View>
  );
}

export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cacbcc',
    marginTop:Constants.statusBarHeight,

  },
});
