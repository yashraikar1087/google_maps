import React, {useState, useEffect} from 'react';
import './App.css';
import Map from './Map';
import { loadMapApi } from './utils/GoogleMapsUtils';

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect( () => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function() {
      setScriptLoaded(true);
    })
  }, []);
  return (
    <div className="App">
      {scriptLoaded && (
        <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true}></Map>
      )}
    </div>
  );
}

export default App;
