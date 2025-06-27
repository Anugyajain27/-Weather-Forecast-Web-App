import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  let [city, setCity] = useState('');
  let [wDetails, setWdetails]=useState()
  let getData=(event)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa0d9647121d2f8a1151273b3950a1a6&units=metric`)
    .then((res) => res.json())
    .then((finalRes) => {
      console.log(finalRes);
      if(finalRes.cod=="404"){
        setWdetails(undefined)
      }
      else {
        setWdetails(finalRes)
      }
      
    })
    

    event.preventDefault()
    setCity('')
  }


  return (
    <div>
      <div>
        <h1>Simple Weather App</h1>

        <form onSubmit={getData}>
          <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City Name" />
          <button>Search</button>
        </form>

        <div>
          {
          wDetails !== undefined
          ?
           <>
              <h3>{wDetails.name} 
                <span>
                  {wDetails.sys.country}
                </span> 
              </h3>
              <h2>
                {wDetails.main.temp}
              </h2>
              <img src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />
              <p>
                {wDetails.weather[0].description}
              </p>
           </>
            :
            "NO Data"
          }
        
        </div>
      </div>
    </div>
  );
}

export default App;
