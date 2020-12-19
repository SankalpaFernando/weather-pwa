import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.scss';
function App() {
  const [info,setInfo]=useState(null)
  useEffect(()=>{
    const {REACT_APP_API}=process.env;
    console.log("🚀 ~ file: App.js ~ line 9 ~ useEffect ~ REACT_APP_API", REACT_APP_API)
    axios.get('https://api.ipify.org?format=json').then(data=>{
      axios.get(`${REACT_APP_API}&query=${data.data.ip}`).then(response=>{
        console.log("🚀 ~ file: App.js ~ line 12 ~ axios.get ~ response", response)
        setInfo(response.data)
      })
    })
  },[])
  
  return (
    <div className="App">
       <div className="location">
       <i className="fas fa-map-marker"></i>
       <p>{info && info.location.country}</p>
       </div>
       <div className="date">
         <p>{new Date().toDateString()}</p>
       </div>
       <div className="weather-card">
         <div className="info">
           <p className="tempreature">{info&& info.current.temperature}<sup>o</sup></p>
           <i className="icon fas fa-cloud"></i>
         </div>
         <div className="description">
           <p className="real">Feel Like {info&&info.current.feelslike} <sup>o</sup></p>
           <p className="type">{info && info.current.weather_descriptions}</p>
         </div>
       </div>
       <div className="data-table">
         <table>
           <tr>
             <td className="type">Humdity</td>
             <td className="value">{info&&info.current.humidity}%</td>
           </tr>
           <tr>
             <td className="type">Pressure</td>
             <td className="value">{info&&info.current.pressure} Pa</td>
           </tr>
           <tr>
             <td className="type">Wind Speed</td>
             <td className="value">{info&&info.current.wind_speed} kmph</td>
           </tr>
           <tr>
             <td className="type">UV Index</td>
             <td className="value">{info&&info.current.uv_index}</td>
           </tr>
         </table>
       </div>
    </div>
  );
}

export default App;
