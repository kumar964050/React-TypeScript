import React, { ReactEventHandler, useState } from "react";

import "./App.css";

interface ButtonProps {
  children: React.ReactNode;
  handleClick: ReactEventHandler;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  handleClick,
  disabled = false,
}) => {
  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

const App: React.FC = () => {
  const [count, setCount] = useState(1);

  const increaseCount: ReactEventHandler = () => setCount(count + 1);
  const decreaseCount: ReactEventHandler = () =>
    count > 0 && setCount(count - 1);

  return (
    <>
      <small>Counter </small>
      <h1>Count : {count}</h1>
      <div>
        <Button handleClick={increaseCount}>Increase</Button>
        <Button handleClick={decreaseCount}>Decrease</Button>
      </div>
    </>
  );
};

export default App;
