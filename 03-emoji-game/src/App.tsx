import { FC, ReactEventHandler, useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import Button from "./components/Button";
import PlayBoard from "./components/PlayBoard";
import FinishCard from "./components/FinishCard";

import "./App.css";

const App: FC = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [topScore, setTopScore] = useState<number>(0);

  const handleReset = () => {
    setStartGame(false);
    setGameOver(false);
    setScore(0);
  };
  const handleGameOver: ReactEventHandler = () => {
    setGameOver(true);
    if (score > topScore) {
      localStorage.setItem("topScore", JSON.stringify(score));
      setTopScore(score);
    }
  };

  useEffect(() => {
    const topScore = localStorage.getItem("topScore");
    if (topScore) setTopScore(parseInt(topScore));
  }, []);

  return (
    <div className="container">
      <NavBar score={score} topScore={topScore} />
      {startGame ? (
        gameOver ? (
          <FinishCard
            score={score}
            topScore={topScore}
            handleReset={handleReset}
          />
        ) : (
          <PlayBoard
            score={score}
            setScore={setScore}
            handleGameOver={handleGameOver}
          />
        )
      ) : (
        <Button handleClick={() => setStartGame(true)}> Start</Button>
      )}
    </div>
  );
};

export default App;
