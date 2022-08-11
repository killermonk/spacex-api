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
      .get("https://api.spacexdata.com/v5/launches")
      .then((response) => {
        console.log("response: ", response.data);
        setLaunches(response.data);
        setKey(response.data.id);
        console.log("key: ", response.data.id);
        setFetching(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
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
      <h1>Upcoming Launches</h1>
      <Launch getData={getData} fetching={fetching} />
      <Launches error={error} key={key} launches={launches} />
    </div>
  );
}

export default App;
