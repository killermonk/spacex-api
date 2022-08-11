import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";

const Launches = props => {

  return (
    <div>
      {props.error ?
      (
        <div>{props.error}</div>
      ) : (
        props.launches.map(launch =>
            (
            ))
      )
    }
    </div>
  );
};

export default Launches;