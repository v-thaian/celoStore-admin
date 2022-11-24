import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Spinner = () => {
  return (
    <>
       <PulseLoader
        color="#401f1f"
        cssOverride={{}}
        loading
        margin={9}
        size={17}
        speedMultiplier={1}
      />
    </>
  );
};

export default Spinner;
