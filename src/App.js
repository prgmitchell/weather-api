import React, { useState } from "react";
import Location from "./Components/Location/Location";
import Weather from "./Components/Weather/Weather";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");

  return (
    <div className="App">
      <Location onSubmit={setLocation} />
      <Weather location={location} />
    </div>
  );
}

export default App;
