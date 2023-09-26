import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ScanService from './services/ScanService';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }


  //Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);


  //What happens when we scan the barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData ' + data)

    const userid = 'spencerrobles19';
    let scanRequest = {userid: userid, barid:data }
    const scanUrl = "http://192.168.100.212:8080/scan/scanProduct";

    const rawUrl = "http://192.168.100.212:8080/scan/scanProduct?barid="+data+"&userid=spencerrobles19"

    // const rawUrl = "http://localhost:8080/scan/scanProduct?barid=523456789122&userid=spencerrobles19"

    axios.post(rawUrl)
    .then( res => { 
      
      alert(res.data);
      console.log(res.data)}
      
      )
    .catch(err=> {
      alert("Something's Wrong");
  });

  }


  //Check permissions and return the screens 
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for Camera Permission</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    )
  }

  //Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
      <BarCodeScanner
      onBarCodeScanned={scanned? undefined: handleBarCodeScanned}
      style ={{height:400, width:400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scan again'} onPress={()=>setScanned(false)} color='tomato'/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});
