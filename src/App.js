import React, { useState, useEffect } from "react";
import axios from "axios";
import Launches from "./components/Launches";
import Launch from "./components/Launch";

function App() {
  const [error, setError] = useState("");
  const [launches, setLaunches] = useState([]);
  const [key, setKey] = useState("");
  const [fetching, setFetching] = useState(false);

  const getData = () => {
    setFetching(true);
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then((response) => {
        setLaunches(response.data);
        setKey(response.data.id);
        setFetching(false);
      })
      .catch((error) => {
        setError(error);
        setFetching(false);
      });
  };

  useEffect(() => {
    {
      getData();
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-light bg-light fixed-top">
        <span className="navbar-brand mb-0 h1">SpaceX Launches</span>
        <span className="float-right">
          <Launch getData={getData} fetching={fetching} />
        </span>
      </nav>
      <div className="p-5"></div>
      <Launches error={error} key={key} launches={launches} />
    </div>
  );
}

export default App;
