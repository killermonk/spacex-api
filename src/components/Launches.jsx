import axios from "axios";
import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";

const Launches = props => {

    const getLaunchpad = (id) => {
        axios
          .get("https://api.spacexdata.com/v5/launchpads/" & id)
          .then((response) => {
            console.log("launchpad: ", response.data);
          })
      }    

  return (
    <div>
      {props.error ?
      (
        <div>{props.error}</div>
      ) : (
        props.launches.map(launch =>
            (
                <div className="p-4 border rounded m-4" key={props.key}>
                    <Row className="p-4">
                        <Col className="col-4">
                            <h2>{launch.name}</h2><br/>
                            <img src={launch.links.patch.small} className="img-thumbnail" />
                        </Col>
                        <Col>
                        <dl>
                            <dt>Date</dt>
                            <dd>{launch.date_utc}</dd>
                            {launch.details ? (
                                    <>
                                        <dt>Details</dt>
                                        <dd>{launch.details}</dd>
                                    </>) : 
                                ("")}

                        </dl>
                        </Col>
                    </Row>
                    <Row>
                    <details>
                            <summary>More launch details</summary>
                            <br/>
                            <dl>
                            </dl>
                        </details>

                    </Row>
                </div>
            ))
      )
    }
    </div>
  );
};

export default Launches;