import React from "react";
// import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span className="sr-only">Loading...</span>
      {/*<Spinner animation="border" role="status">
    </Spinner>*/}
    </div>
  );
}

export default Loader;
