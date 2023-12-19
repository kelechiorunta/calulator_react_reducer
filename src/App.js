// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Button from "./components/Button";
import { useReducer, useState, useCallback, useMemo, useEffect } from "react";
import Output from "./components/Output";
import ArrayOutput from "./components/ArrayOutput";
// import { createContext } from "react";
import resultContext from "./components/resultContext";

var digit = "";
var answer = 0;
var sign = "";
const initialState = "";

const App = () => {
  const [myoutput, setmyOutput] = useState(0);
  //const [answer, setAnswer] = useState(0);
  const [digit_comp, setDigit] = useState("");
  const myreducer = useCallback(
    (state = initialState, action) => {
      switch (action.type) {
        case "COMPUTE": {
          return [Number(action.payload)];
        }
        case "ADD_DECIMAL": {
          return state.toString() + ".";
        }
        case "BACKSPACE": {
          return digit.length <= 0
            ? (state = 0)
            : (digit = state.toString().substring(0, state.length - 1));
        }
        case "MINUS": {
          return state - 1;
        }
        case "APPEND": {
          return (digit = action.payload);
        }
        case "RESET": {
          return (state = 0);
        }
        default: {
          return state;
        }
      }
    },
    [sign]
  );

  const [result, dispatch] = useReducer(
    useMemo(() => myreducer, [answer, sign]),
    initialState
  );

  // const dispatch = useMemo(() => {
  //   return olddispatch, [answer, sign];
  // });

  //const [result, dispatch] = useReducer(myreducer, initialState);
  // const result = useMemo(() => {
  //   return dispatch;
  // }, [sign]);

  const dispatchResult = useCallback(dispatch, [sign]);

  const [operator, setOperator] = useState("");
  // const [array_output, setarray_output] = useState([0]);
  const [output, setOutput] = useState(0);

  const reset = () => {
    digit = "";
  };

  const computation = useCallback(
    (sign) => {
      switch (sign) {
        case "+": {
          answer += Number(digit); //setAnswer(answer + Number(digit));
          //sign = "";
          break;
        }
        case "-": {
          answer -= Number(digit); //setAnswer(answer - Number(digit)); //answer -= Number(digit);
          break;
        }
        case "*": {
          answer *= Number(digit === "" ? 1 : digit); //setAnswer(answer * Number(digit === "" ? 1 : digit)); //answer *= Number(digit === "" ? 1 : digit);
          break;
        }
        case "/": {
          answer /= Number(digit === "" ? 1 : digit); //setAnswer(answer / Number(digit === "" ? 1 : digit)); //answer /= Number(digit === "" ? 1 : digit);
          break;
        }
        default: {
          answer = Number(digit); //setAnswer(Number(digit)); //answer = Number(digit);
          break;
        }
      }
      console.log(answer, "Happy");
      //setOutput(answer);
      //setmyOutput(answer);
      setOperator(sign);
      //console.log(operator);
      //console.log("hello");
      return answer;
    },
    [sign, answer]
  );

  // [answer, output]
  const computedmemoresult = useMemo(() => {
    return answer;
  }, [answer]);

  const memoizedcomputation = useCallback(() => {
    return computation(sign);
  }, [answer, sign]);

  // useEffect(() => {
  //   const memoizedcomputation = () => {
  //     return computation(sign);
  //   };
  //   memoizedcomputation();
  // }, [operator]);

  const memoizedans = useMemo(() => {
    return computation(sign);
  }, [answer, sign]);

  const memoizedoperator = useCallback(
    (myoperator) => {
      return setOperator(myoperator);
    },
    [operator]
  );

  const memoizedsign = useMemo(() => {
    return operator;
  }, [operator]);

  const memoizedresult = useMemo(() => {
    return result;
  }, [digit, sign, answer]);

  return (
    <div className="App">
      <resultContext.Provider value={memoizedans}>
        <ArrayOutput
          myresult={memoizedans}
          mydigit={digit}
          mysign={operator}
          // myarray={[...array_output]}
        />
      </resultContext.Provider>

      <Output myresult={memoizedresult} mysign={sign} />

      <Button
        myclass={"clearall"}
        myresult={0}
        mydispatch={() => {
          dispatchResult({
            type: "RESET",
            payload: (digit = ""),
          });
          memoizedoperator("");
          //setAnswer(0); //answer = 0;
          setOutput(0);
        }}
        mytype={"CE"}
        key={"CE"}
      />

      <Button
        myclass={"backspace"}
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "BACKSPACE",
            payload: (digit = myoutput),
          });
          memoizedoperator("");
          setOutput("");
        }}
        mytype={"Backspace"}
        key={"Backspace"}
      />

      <Button
        myresult={memoizedresult}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "1") : (digit += "1"),
          });
          setDigit(digit);
          //setOutput(output + 1);
          memoizedoperator("");
        }}
        mydigits={digit}
        mytype={"1"}
        key={"1"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "2") : (digit += "2"),
          });
          memoizedoperator("");
        }}
        mytype={"2"}
        key={"2"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "3") : (digit += "3"),
          });
          memoizedoperator("");
        }}
        mytype={"3"}
        key={"3"}
      />
      <Button
        // myresult={useMemo(() => {
        //   return memoizedresult;
        // }, [sign])}
        myresult={result}
        mydispatch={useCallback(() => {
          dispatchResult({
            type: "COMPUTE",
            payload: memoizedcomputation(), //computedmemoresult,
          });
          reset();
          sign = "+";
          //memoizedoperator(sign);
        }, [dispatchResult, sign, dispatch])}
        mydigits={digit}
        myoperator={operator}
        mytype={"+"}
        key={"+"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "4") : (digit += "4"),
          });
          memoizedoperator("");
        }}
        mytype={"4"}
        key={"4"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "5") : (digit += "5"),
          });
          memoizedoperator("");
        }}
        mytype={"5"}
        key={"5"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "6") : (digit += "6"),
          });
          memoizedoperator("");
        }}
        mytype={"6"}
        key={"6"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "COMPUTE",
            payload: memoizedcomputation(),
          });
          // setarray_output([...array_output, Number(digit)]);
          reset();
          sign = "-";
          memoizedoperator(sign);
        }}
        mytype={"-"}
        key={"-"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "7") : (digit += "7"),
          });
          memoizedoperator("");
        }}
        mytype={"7"}
        key={"7"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "8") : (digit += "8"),
          });
          memoizedoperator("");
        }}
        mytype={"8"}
        key={"8"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "9") : (digit += "9"),
          });
          memoizedoperator("");
        }}
        mytype={"9"}
        key={"9"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "COMPUTE",
            payload: computation(sign),
          });
          // setarray_output([...array_output, Number(digit)]);
          reset();
          sign = "*";
          memoizedoperator(sign);
        }}
        mytype={"*"}
        key={"*"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: digit === "0" ? (digit = "0") : (digit += "0"),
          });
          memoizedoperator("");
        }}
        mytype={"0"}
        key={"0"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          (!result.toString().includes(".") ||
            !digit.toString().includes(".")) &&
            dispatchResult({
              type: "APPEND",
              payload: digit === "" ? (digit += "0.") : (digit += "."),
            });
        }}
        mytype={"."}
        key={"."}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "APPEND",
            payload: (digit = -digit),
          });
        }}
        mytype={"-/+"}
        key={"-/+"}
      />
      <Button
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "COMPUTE",
            payload: computation(sign),
          });
          // setarray_output([...array_output, Number(digit)]);
          reset();
          sign = "/";
          memoizedoperator(sign);
        }}
        mytype={"/"}
        key={"/"}
      />
      <Button
        myclass={"answer"}
        myresult={result}
        mydispatch={() => {
          dispatchResult({
            type: "COMPUTE",
            payload: computation(sign),
          });
          //reset();
          //setOutput("");
          reset();
          // sign = "";
          memoizedoperator(sign);
        }}
        mytype={"="}
        key={"="}
      />
    </div>
  );
};

export default React.memo(App);

// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
