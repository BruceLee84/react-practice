import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather(){
    const[data, setData]= useState({});
    const[location, setLocation]= useState('');

   const Search=()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0c711e52f2507d4f199ce3c612c27617`).then(data=>{
        console.log('weather', data)
        console.log('data', data.data)
        setData(data.data)
    }).catch(err=>{
        console.log(err.message)
    })
   }

//    useEffect(()=>{
//     Search()
//    },[])

    return(
        <>
        <div className="app">
            <div className="search">
              <input value={location} placeholder='Enter Location' type="text" onChange={event => setLocation(event.target.value)}/>
              <button onClick={Search}>Search</button>
            </div>
        <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>Temp {data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>     
        </>
    )
}

export default Weather;