import { FC } from "react";

interface Emoji {
  id: number;
  emoji: string;
}
interface emojiProps {
  emoji: Emoji;
  handleClick: (id: number) => void;
}

const EachEmoji: FC<emojiProps> = ({ emoji, handleClick }) => {
  return (
    <div
      className="emoji-icon"
      onClick={() => handleClick(emoji.id)}
      dangerouslySetInnerHTML={{ __html: emoji.emoji }}
    />
  );
};

export default EachEmoji;
