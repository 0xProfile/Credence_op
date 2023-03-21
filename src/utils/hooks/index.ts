import { useState, useEffect } from "react";

const useKeyPress = (targetKey: string) => {
  const [pressed, setPressed] = useState(false);

  const downPress = ({ key }: KeyboardEvent) => {
    if (targetKey === key) setPressed(true);
  };

  const upPress = ({ key }: KeyboardEvent) => {
    if (targetKey === key) setPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downPress);
    window.addEventListener("keyup", upPress);
    return () => {
      window.removeEventListener("keydown", downPress);
      window.removeEventListener("keyup", upPress);
    };
  });

  return pressed;
};

export { useKeyPress };
