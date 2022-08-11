import Button from "react-bootstrap/button";

const Launch = props => {
  return (
    <div className="p-2 mx-auto">
      {props.fetching ? ("Your Launch is loading") : (<Button onClick={props.getData}>Refresh List</Button>)}
    </div>
  );
};

export default Launch;