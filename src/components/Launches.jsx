import React, { useState, useEffect } from "react";
import axios from "axios";

function loadRockets(launches) {
  const rocketIDs = new Set(launches.map(launch => launch.rocket))

  const nextRockets = {}
  const rocketPromises = []
  rocketIDs.forEach(id => {
    const promise = axios
      .get(`https://api.spacexdata.com/v4/rockets/${id}`)
      .then(response => {
        nextRockets[id] = response.data;
      })

    rocketPromises.push(promise)
  })

  return Promise.all(rocketPromises).then(() => nextRockets);
}

const Launches = props => {
  const [rockets, setRockets] = useState({});

  useEffect(() => {
    loadRockets(props.launches)
      .then(nextRockets => {
        setRockets(nextRockets)
      })
  }, [props.launches])

  const splitDate = (date) => {
    let temp = date.split("T");
    let day = temp[0];
    let tmpTime = temp[1];
    let time = tmpTime.split(":00.000Z")
    return `${day} at ${time[0]}`
  }

  if (props.error) {
    return (<div>{props.error}</div>)
  }
  if (props.fetching) {
    return (<div>Loading launches</div>)
  }

  return (
    <div>
      {props.launches.map(launch =>
      (
        <div className="p-5 border rounded m-4 bg-light" key={launch.id}>
          <div className="d-flex justify-content-center">
            <h2 className="">{launch.name}</h2>
          </div>
          <div className="d-flex justify-content-center">
            <img className="" src={launch.links.patch.small} style={{ maxHeight: "150px" }} />
          </div>

          <div className="pt-4">
            <dl>
              <dt>Date</dt>
              <dd>{splitDate(launch.date_utc)}</dd>

              {launch.details && (
                <>
                  <dt>Details</dt>
                  <dd>{launch.details}</dd>
                </>
              )}

              <dt>Outcome</dt>
              {launch.success ? (
                <>
                  <dd>Success</dd>
                </>
              ) : (
                <>
                  <dd>Failed</dd>
                </>
              )}

              <dt>Rocket</dt>
              <dd>{(launch.rocket in rockets) ? rockets[launch.rocket].name : 'Loading rocket name...'}</dd>
            </dl>
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default Launches;