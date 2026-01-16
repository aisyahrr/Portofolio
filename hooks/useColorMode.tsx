import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage<"light" | "dark">(
    "color-theme",
    "light"
  );

  useEffect(() => {
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add("dark")
      : bodyClass.remove("dark");
  }, [colorMode]);

  return [colorMode, setColorMode] as const;  
};


export default useColorMode;
