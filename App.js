import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import InfoCard from './src/components/InfoCard';
import * as Location from 'expo-location';
import getCurrentWeather from './api/ConsultApi';

export default function App() {
  
  const axios = require('axios')
  const [darkTheme, setDarkTheme] = useState(true)

  const [currentTemp, setCurrentTemp] = useState('27')
  const [locationCoords, setLocationCoords] = useState(null)
  const [locationName, setLocationName] = useState('BR, São Paulo')
  const [tempMin, setTempMin] = useState('21')
  const [tempMax, setTempMax] = useState('31')
  const [wind, setWind] = useState('65')
  const [humidity, setHumidity] = useState('80')
  const [currentHour, setCurrentHour] = useState('13:00')

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      paddingTop: 100,
      alignItems: 'center',
    },
    sun: {
      color: 'orange',
      fontSize: 48,
    },
    temperature: {
      alignItems: 'center',
      flexDirection: 'row',
    },  
    tempNumber: {
      color: darkTheme ? '#e0e0e0' : 'black',
      fontSize: 54,
      paddingLeft: 32
    },
    tempCelcius: {
      color: darkTheme ? '#e0e0e0' : 'black',
      fontSize: 20,
      paddingRight: 32
    },
    refresh: {
      fontSize: 24,
      color: darkTheme ? 'white' : 'black',
    },
    locationText: {
      color: darkTheme ? '#e0e0e0' : 'black',
      fontSize: 14,
      paddingTop: 16,
    },
    hourText: {
      color: darkTheme ? '#e0e0e0' : 'black',
      fontSize: 14,
      fontWeight: 'bold',
      paddingBottom: 200
    },
    info: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: darkTheme ? '#393e54' : '#8f8f8f',
      borderRadius: 20,
      width: 260,
      height: 180,
    },
    infoCard: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    themeBtn: {
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25
    },
    squareBtn: {
      backgroundColor: darkTheme ? '#f2f2f2' : '#8f8f8f',
      justifyContent: 'center',
      borderRadius: 20,
      width: 48,
      height: 26,
    },
    circleBtn: {
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 4,
      width: 20,
      height: 20,
      borderRadius: 50
    }
  });

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if(status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
    } else {
      let location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
    }
  }

  async function setCurrentWeather() {
    await getLocation()

    let date = new Date()
    setCurrentHour(date.getHours() + ':' + date.getMinutes())

    const data = await getCurrentWeather(locationCoords)

    setCurrentTemp(convertKelvinInC(data[0]))
    setTempMin(convertKelvinInC(data[1]))
    setTempMax(convertKelvinInC(data[2]))
    setLocationName(data[3])
    setWind(data[4])
    setHumidity(data[5])
  }

  function convertKelvinInC(kelvin) {
    return parseInt(kelvin - 273)
  }

  useEffect(() => {
    setCurrentWeather()
  }, [])

  return (
    <View style={styles.container}>      
      <View style={styles.temperature}>
        <Feather style={styles.sun} name="sun" />
        
        <Text style={styles.tempNumber}>{currentTemp}</Text>
        <Text style={styles.tempCelcius}>°C</Text>

        <TouchableOpacity style={styles.refreshBtn} onPress={() => setCurrentWeather()}>
          <EvilIcons style={styles.refresh} name="refresh" />
        </TouchableOpacity>
      </View>

      <Text style={styles.locationText}>{locationName}</Text>
      <Text style={styles.hourText}>{currentHour}</Text>

      <View style={styles.info}>
        <View style={styles.infoCard}>
          <InfoCard title={'Vento'} value={wind}></InfoCard>
          <InfoCard title={'Umidade'} value={humidity}></InfoCard>
          <InfoCard title={'Temp. Min'} value={tempMin}></InfoCard>
          <InfoCard title={'Temp. Max'} value={tempMax}></InfoCard>
        </View>
      </View>

      <View style={styles.themeBtn}>
        <View style={styles.squareBtn}>
          <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => darkTheme ? setDarkTheme(false) : setDarkTheme(true)}>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

