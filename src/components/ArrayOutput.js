import React from "react";
import { useMemo } from "react";
// import { useContext } from "react";
// import resultContext from "./resultContext";

function ArrayOutput({ myresult, mydigit, myarray, mysign, myreset }) {
  //const myanswer = useContext(resultContext);

  const memoizedresult = useMemo(() => {
    return myresult;
  }, [mysign, myresult]);

  return (
    <div className="output">
      <h6 className="output">
        <span className="operator_cont">Ans: {memoizedresult}</span>
      </h6>
    </div>
  );
}

export default React.memo(ArrayOutput);
