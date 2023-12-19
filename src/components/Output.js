import React from "react";
import { useMemo } from "react";

function Output({ myresult, mysign }) {
  const memoizedans = useMemo(() => {
    return myresult;
  }, [myresult, mysign]);

  const memoizedsign = useMemo(() => {
    return mysign;
  }, [mysign, myresult]);

  return (
    <div className="output">
      <h6 className="output">
        {memoizedans}
        <span className="operator_cont">{memoizedsign}</span>
      </h6>
      {console.log(memoizedans)}
    </div>
  );
}

export default React.memo(Output);
