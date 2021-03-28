import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, Alert , KeyboardAvoidingView} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';




const CreateEmployee=({navigation, route})=>{

    const getDetails=(type)=>{
        if(route.params){
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }

    const [name, setName]=useState(getDetails("name")); 
    const [phone, setPhone]=useState(getDetails("phone"));
    const [email, setEmail]=useState(getDetails("email"));
    const [salary, setSalary]=useState(getDetails("salary"));
    const [picture, setPicture]=useState(getDetails("picture"));
    const [position , setPosition]=useState(getDetails("position"));
    const [modal, setModal]=useState(false);
    const [enableshift,setEnableshift]=useState(false)

    //este es el codigo para enviar al saervidor(inicio)
    const submiData=()=>{ 
        fetch("http://10.0.2.2:3000/send-data",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data =>{
           Alert.alert(`${data.name} fue salvado satisfactiriamente`)
           navigation.navigate("Home")
           console.log(data)
        }).catch(err=>{
            Alert.alert("Algo salio mal")
        })
        
    }

    const updateDetails=()=>{
        fetch("http://10.0.2.2:3000/update",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data =>{
           Alert.alert(`${data.name} fue actualizado satisfactiriamente`)
           navigation.navigate("Home")
           console.log(data)
        }).catch(err=>{
            Alert.alert("Algo salio mal")
        })
    }
    //este es el codigo para enviar al saervidor(fin)

    const pickFromGallery= async()=>{
       const{granted}= await Permissions.askAsync(Permissions.CAMERA);
       if(granted){
          let data=  await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images, 
                allowsEditing:true,
                aspect:[1,1],
                quality:1
            }); 
            if(!data.cancelled){
                let newfile={
                    uri:data.uri, 
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                   }
               handleUpload(newfile)
            }
       } else{
            Alert.alert("necesitas permiso para trabajar")
       }
    }

    const pickFromCamera= async()=>{
        const{granted}= await Permissions.askAsync(Permissions.CAMERA);
        if(granted){
           let data=  await ImagePicker.launchCameraAsync({
                 mediaTypes:ImagePicker.MediaTypeOptions.Images, 
                 allowsEditing:true,
                 aspect:[1,1],
                 quality:1
             }); 
             if(!data.cancelled){
                 let newfile={
                     uri:data.uri, 
                     type:`test/${data.uri.split(".")[1]}`,
                     name:`test.${data.uri.split(".")[1]}`
                    }
                handleUpload(newfile)
             }
        } else{
             Alert.alert("necesitas permiso para trabajar")
        }
     }

     const handleUpload=(image)=>{
        const data= new FormData()
        data.append('file',image)
        data.append('upload_preset','linkedin') 
        data.append('cloud_name','elimora')
            
        fetch("https://api.cloudinary.com/v1_1/elimora/image/upload", {
            method:"post",
            body:data

        }).then(res=>res.json())
          .then(data=>{
            setPicture(data.url)
            setModal(false)
            }).catch(err=>{
                Alert.alert("Algo salio mal mientras subia el archivo")
            })
     }


    return(
    <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
       <View >
            <TextInput
                label="Nombre"
                style={styles.inputStyle}
                value={name}
                theme={theme}
                onFocus={()=>setEnableshift(false)}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
             <TextInput
                label="Email"
                style={styles.inputStyle}
                value={email}
                theme={theme}
                onFocus={()=>setEnableshift(false)}
                keyboardType="email-address"
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
             <TextInput
                label="Telefono"
                style={styles.inputStyle}
                value={phone}
                theme={theme}
                onFocus={()=>setEnableshift(false)}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
             <TextInput
                label="Salario"
                style={styles.inputStyle}
                value={salary}
                theme={theme}
                onFocus={()=>setEnableshift(true)}
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                label="Posicion"
                style={styles.inputStyle}
                value={position}
                theme={theme}
                onFocus={()=>setEnableshift(true)}
                mode="outlined"
                onChangeText={text => setPosition(text)}
            />
             <Button    
             style={styles.inputStyle} 
             theme={theme} 
             icon={picture==""?"upload" :"check-bold"}
             mode="contained" 
             onPress={() => setModal(true)}>
                Carar Imagen
             </Button>
             {route.params ?
            <Button    
            style={styles.inputStyle} 
            theme={theme} 
            icon="content-save" 
            mode="contained" 
            onPress={() => updateDetails() }>
                Actualizar
            </Button>
                         :
            <Button    
                style={styles.inputStyle} 
                theme={theme} 
                icon="content-save" 
                mode="contained" 
                onPress={() => submiData() }>
                    Agregar
            </Button>
             }
            
             <Modal
                animated="slide"
                transparent={true}
                visible={modal}
                onRequestClose={()=>
                    setModal(false)}
             >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Button  
                            icon="camera"   
                            mode="contained" 
                            theme={theme}
                            onPress={() => pickFromCamera()}>
                            camara
                        </Button>
                        <Button 
                            icon="image-area"   
                            mode="contained"
                            theme={theme}
                            onPress={() => pickFromGallery()}>
                            Galeria
                        </Button>
                    </View>
                    <Button 
                     theme={theme} 
                     onPress={() => setModal(false)}>
                            Cancelar
                        </Button>
                </View>
             </Modal>
       </View>
       </KeyboardAvoidingView>
    ); 
}; 

const theme={
    
    colors:{
        primary:"blue"
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1
    }, 
    inputStyle:{
        margin:5
    }, 
    modalButtonView:{
        flexDirection:"row", 
        justifyContent:"space-around",
        padding:10
    }, 
    modalView:{
        position:"absolute", 
        bottom:2,
        width:"100%", 
        backgroundColor:"white"
    }
}); 

export default CreateEmployee; 