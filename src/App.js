import React, { useEffect, useState } from 'react';
import './App.css';

const getCovidData = () => {
  const promise = new Promise((resolve) => {
    fetch('https://api.covid19india.org/data.json')
      .then((response) => {
        return response.json();
      })
      .then((covidData) => {
        resolve(covidData);
      })
  });
  return promise;
}

function App() {

  const [covidData, setCovidData] = useState([]);
  const [currentCovidData, setCurrentCovidData]=useState([]);

  useEffect(() => {
    const promise = getCovidData();
    promise.then((covidData) => {
      //console.log(covidData);
      setCovidData(covidData.statewise);
      setCurrentCovidData(covidData.statewise);
    })
  }, [])

  const onSearch=(searchedText)=>{
      var statesData=[];
      //console.log(searchedText);
      if(searchedText.length===0) setCurrentCovidData(covidData);
      for(var i=0;i<covidData.length;i++)
      {
        //console.log(covidData[i].state.toLowerCase());
        if(covidData[i].state.toLowerCase().startsWith(searchedText.toLowerCase()))
        {
            //console.log(covidData[i]);
            statesData.push(covidData[i]);
        }
      }
      setCurrentCovidData(statesData);
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>India Covid-19 Cases Statewise Status</h1><hr/>
      <SearchBox onSearch={onSearch}/>
      <Covid currentCovidData={currentCovidData} />
    </div>
  );
}

const SearchBox=({onSearch})=>{

    const searchedTextHandler=(ev)=>{
        onSearch(ev.target.value);
    }

    return(
      <div className='searchbox'> 
        <br/>
        <input type='text' placeholder=' search state' onChange={searchedTextHandler}></input>
      </div>
    )
}

const Covid=({currentCovidData})=>{
    return(
      <div className="container">
        {
          (currentCovidData.length===0)?
          <h2>NO DATA FOUND</h2>:
          currentCovidData.map((statewise)=>{
              return <CovidCard key={currentCovidData.statecode} currentCovidData={statewise} />
          })
        }
      </div>
    )
}

const CovidCard = ({ currentCovidData }) => {
  return (
      <div className="card">
        <div className="box">
          <div className="content">
            <h1>{currentCovidData.state}</h1><hr/><br/>
            <p>Total cases: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{currentCovidData.confirmed}</b></p>
            <p>Active cases: <b style={{background:"#A1A09F", padding:"1px 5px"}}>{currentCovidData.active}</b></p>
            <p>Total deaths: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{currentCovidData.deaths}</b></p>
            <p>Total recovered: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{currentCovidData.recovered}</b></p>
            <p>Last updated on: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{currentCovidData.lastupdatedtime}</b></p>
          </div>
        </div>
      </div>
  )
}

export default App;
