import { FC, ReactEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  handleClick?: ReactEventHandler;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  children,
  handleClick,
  type = "button",
}) => {
  return (
    <button className="button" type={type} onClick={handleClick}>
      {children}
    </button>
  );
};
export default Button;
