import { FC, ReactEventHandler, useEffect, useState } from "react";
import EachEmoji from "./EachEmoji";
interface Emoji {
  id: number;
  emoji: string;
}

interface PlayBoardProps {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  handleGameOver: ReactEventHandler;
}

function shuffleArray(array: Emoji[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const faceEmojis = [
  { id: 1, emoji: `&#128512;` },
  { id: 2, emoji: `&#128522;` },
  { id: 3, emoji: `&#128525;` },
  { id: 4, emoji: `&#128526;` },
  { id: 5, emoji: `&#128545;` },
  { id: 6, emoji: `&#128546;` },
  { id: 7, emoji: `&#128514;` },
  { id: 8, emoji: `&#128519;` },
  { id: 9, emoji: `&#128540;` },
  { id: 10, emoji: `&#129300;` },
  { id: 11, emoji: `&#128567;` },
  { id: 12, emoji: `&#129303;` },
];

const PlayBoard: FC<PlayBoardProps> = ({ score, setScore, handleGameOver }) => {
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);

  const handleClick = (id: number) => {
    if (selectedEmojis.indexOf(id) == -1) {
      setScore((prevScore) => prevScore + 1);
      setSelectedEmojis([...selectedEmojis, id]);
    } else handleGameOver();
  };

  useEffect(() => {
    shuffleArray(faceEmojis);
  }, [score, handleGameOver]);
  return (
    <div className="play-board-container">
      {faceEmojis.map((emoji, index) => (
        <EachEmoji key={index} emoji={emoji} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default PlayBoard;
