import { useContext } from "react";
import { ThemeContext } from "./contexts";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context == null) {
    throw new Error("useTheme should only be used in ThemeProvider.");
  }

  return context;
};
