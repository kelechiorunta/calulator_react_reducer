import React, { useCallback } from "react";
//import { useMemo } from "react";

function Button({ myresult, mydispatch, mytype, myclass, mydigits }) {
  const memoizeddispatch = useCallback(() => {
    return mydispatch(mytype);
  }, [mytype, mydispatch]);
  return (
    <>
      <button className={myclass} onClick={memoizeddispatch}>
        {mytype}
      </button>
      {/* {console.log(memoizeddispatch)} */}
    </>
  );
}

export default React.memo(Button);
