import { FC } from "react";

interface NavProps {
  score: number;
  topScore: number;
}

const NavBar: FC<NavProps> = ({ score, topScore }) => {
  return (
    <nav className="nav-container">
      <div className="nav-title-container">
        <img
          className="nav-title-img"
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="nav-title-img"
        />
        <span>Emoji Game</span>
      </div>
      <ul className="nav-links-container">
        <li className="nav-link">Score : {score}</li>
        <li className="nav-link">Top Score : {topScore}</li>
      </ul>
    </nav>
  );
};

export default NavBar;
