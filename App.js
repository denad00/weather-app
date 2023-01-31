import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from './src/components/Form'
import Content from './src/components/Content'
import Footer from './src/components/Footer'

export default function App() {
  const [city, setCity] = useState('') 
  const [temp, setTemp] = useState('')
  const [weather, setWeather] = useState('')
  const [pressure, setPressure] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [minTemp, setMinTemp] = useState('')

  const fetchData = () => {
    fetchCityData(city)
  }

  const fetchCityData = async city => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a90269e7c58dd5ad94aedb3de6e7d9ea&units=metric`

    const apiCall = await fetch(url)

    const response = await apiCall.json()
    console.log('response', response)

    setTemp(response.main.temp)
    setWeather(response.weather[0].main)
    setPressure(response.pressure)
    setWindSpeed(response.wind.speed)
    setMinTemp(response.temp_min)
  }

  return (
    <View style={styles.container}>
      <Form 
        onChangeText={text => setCity(text)}
        onSubmit={fetchData}
      />
      <Content 
        city={city} 
        weather={weather} 
        temp={temp}
      />
      <Footer 
        pressure={pressure} 
        windSpeed={windSpeed} 
        minTemp={minTemp}
      />
      <StatusBar style="auto" />
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
});
