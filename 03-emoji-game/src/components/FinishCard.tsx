import { FC, ReactEventHandler } from "react";

import Button from "./Button";

interface FinishCardProps {
  score: number;
  topScore: number;
  handleReset: ReactEventHandler;
}

const FinishCard: FC<FinishCardProps> = ({ score, topScore, handleReset }) => {
  return (
    <div className="finished-container">
      <img
        src={
          score >= topScore
            ? "https://assets.ccbp.in/frontend/react-js/won-game-img.png"
            : "https://assets.ccbp.in/frontend/react-js/lose-game-img.png"
        }
      />
      <Button handleClick={handleReset}>Reset</Button>
    </div>
  );
};

export default FinishCard;
