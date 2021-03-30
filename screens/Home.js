import React ,{useEffect,useState}from 'react';
import { StyleSheet, Text, View , Image, FlatList,Alert} from 'react-native';
import {Card, FAB} from "react-native-paper";

const Home=({navigation})=>{

    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)

    const fetchData=()=>{
        fetch("http://linkedinnew.herokuapp.com/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            Alert.alert("Algo salio mal al refrescar")
        })
    }
    useEffect(()=>{
       fetchData()
    },[])

    const renderList=((item)=>{
        console.log('bitch 2')  
        return(
            <Card style={styles.mycard} 
                onPress={()=>navigation.navigate("Profile",{item})}
            >
            <View style={styles.cardView}>
                <Image 
                    style={{width:100, height:100, borderRadius:100/2}}
                    source={{uri:item.picture}}
                />
                <View style={{marginLeft:10}}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.position}</Text>
                </View>
            </View>
        </Card>
        ); 
    })
    return(
     <View style={{flex:1}}>
        <FlatList
            data={data}
            renderItem={({item})=>{
             return renderList(item)
         }}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetchData()}
            refreshing={loading}
            
         />
         
          <FAB onPress={()=>navigation.navigate("Create")}
            style={styles.fab}
            small={false}
            theme={{colors:{accent:"blue"}}}
            icon="plus"
           
         />
    </View>
        
        
        
    ); 
}

const styles=StyleSheet.create({
    mycard:{
        margin:5, 
        padding:5, 
        flexDirection:'row'
    }, 
    cardView:{
        flexDirection:'row', 
        padding:6
    }, 
    text:{
        fontSize:20,
     
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
}); 

export default Home; 