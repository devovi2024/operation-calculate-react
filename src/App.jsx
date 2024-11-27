import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for light/dark mode
import "./App.css"; // CSS file

const InitialInputsState = { a: 0, b: 0 };

const App = () => {
  const [inputState, setInputState] = useState({ ...InitialInputsState });
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState("light");

  const handleInputFields = (inp) => setInputState({ ...inputState, ...inp });

  const handleClearOps = () => {
    setInputState({ ...InitialInputsState });
    setResult(0);
  };

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b !== 0 ? a / b : "Error (Div by 0)"),
    "^": (a, b) => Math.pow(a, b),
    "%": (a, b) => a % b,
    "√": (a) => Math.sqrt(a),
  };

  const handleOperation = (operator) => {
    const calcResult = operations[operator](inputState.a, inputState.b);
    setHistory([...history, `${inputState.a} ${operator} ${inputState.b} = ${calcResult}`]);
    setResult(calcResult);
  };

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  const clearHistory = () => setHistory([]); // Clear history function

  return (
    <div className={`container ${mode}`}>
      {/* Mode Toggle Button */}
      <button className="mode-toggle" onClick={toggleMode}>
        {mode === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
      </button>

      <h1>Result: {result}</h1>

      {/* Input Fields */}
      <div>
        <input
          type="number"
          value={inputState.a}
          onChange={(e) => handleInputFields({ a: parseInt(e.target.value) })}
        />
        <input
          type="number"
          value={inputState.b}
          onChange={(e) => handleInputFields({ b: parseInt(e.target.value) })}
        />
      </div>

      {/* Operation Buttons */}
      <div className="operations">
        {["+", "-", "*", "/", "^", "%", "√"].map((operator) => (
          <button key={operator} onClick={() => handleOperation(operator)}>
            {operator}
          </button>
        ))}
        <button onClick={handleClearOps}>Clear</button>
      </div>

      {/* History Section */}
      <div className="history">
        <p>History</p>
        {history.length ? (
          <>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
            <button className="clear-history" onClick={clearHistory}>
              Clear History
            </button>
          </>
        ) : (
          <p>
            <small>No History</small>
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
