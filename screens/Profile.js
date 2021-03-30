import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Linking,Platform, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title ,Card, Button} from "react-native-paper";
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons'; 

const Profile =(props)=>{
    const {_id,name,picture, phone,salary,email,position}=props.route.params.item
    console.log(_id)
    const deleteEmployee=()=>{
        fetch("https://miserverlinkedin.herokuapp.com/delete",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                id:_id
            })
        }).then(res=>res.json())
          .then(deleteEmp=>{
              Alert.alert(`${deleteEmp.name} fue eliminado con exito `)
              props.navigation.navigate("Home")
          }).catch(err=>{
            Alert.alert("Algo salio mal al borrar")
             })
    }
    
    const openDial=()=>{
        if(Platform.OS==="android"){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    return(
       <View style={styles.root}>
           <LinearGradient
            colors={["#0a19f5","#868df7"]}
            style={{height:"20%"}}
           />
           <View style={{alignItems:"center", marginTop:-50}}>
                <Image
                style={{width:140, height:140, borderRadius:140/2}}
                source={{uri:picture}}
                />  
            </View>
            <View style={{alignItems:"center", margin:15}}>
                <Title >{name}</Title>
                <Text style={{fontSize:15}}>{position}</Text>
            </View>
            <Card style={styles.mycard} onPress={()=>{
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                <MaterialIcons name="email" size={40} color="blue" />
                <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={()=>openDial()}>
                <View style={styles.cardContent}>
                <Entypo name="old-phone" size={40} color="blue" />
                <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.cardContent}>
                <FontAwesome name="money" size={40} color="blue" />
                <Text style={styles.myText}>{salary}</Text>
                </View>
            </Card>
            <View style={{flexDirection:"row", justifyContent:"space-around", padding:10}}>
                <Button
                 icon="account-edit" 
                 mode="contained" 
                 theme={theme}
                 onPress={() =>{
                    props.navigation.navigate("Create",{_id,name,picture, phone,salary,email,position}
                    )
                }}>
                    Editar
                </Button>
                <Button
                 icon="delete-circle" 
                 mode="contained" 
                 theme={theme}
                 onPress={() => deleteEmployee()}>
                    Descartar
                </Button>
            </View>
       </View>
    ); 
}
const theme={
    
    colors:{
        primary:"blue"
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1
    }, 
    mycard:{
        margin:3
    }, 
    cardContent:{
        flexDirection:"row", 
        padding:8
    }, 
    myText:{
        fontSize:22, 
        marginTop:3,
        marginLeft:3
    }
})
export default Profile; 