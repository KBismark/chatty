import { type ReactNode, createContext, useContext, useState, useMemo } from "react";
import Theme from "../constants/Colors";
import { Text as RNText, TextProps } from "react-native";
/**
 * 
 * A simple setup to support both light and dark modes 
 * 
 */
type Modes = 'light'|'dark';
const ThemeContext = createContext(Theme.light);
const Provider = ThemeContext.Provider;
// A method to make it easy to implement dark mode feature if you wish to
export const useTheme = ()=>{
  return useContext(ThemeContext)
}
// Call this method to change the theme of the app. (Don't forget to update the dark colors above)
export const setThemeMode = (mode: Modes)=>{
  switch (mode) {
    case 'dark':
      break;
    default:
      // fallback to light mode if 'light' or any other value was provided
      mode = 'light'
      break;
  }
  themeSetter(Theme[mode] as any);
}
let themeSetter: React.Dispatch<React.SetStateAction<typeof Theme['light']>> = (()=>{}) as any;
// The theming provider. Must be the parent component of your main App component.
export const AppThemeProvider = ({children}:{children:ReactNode|React.JSX.Element})=>{
  const [theme,setTheme] = useState(Theme.light);
  themeSetter = setTheme;// Make state setter publicly accessible in this module
  return (
    <Provider value={theme}>{children}</Provider>
  )
}

export const Text = (props: TextProps)=>{
  const {fadedBlack} = useTheme().colors;
  return <RNText {...props} style={[{color: fadedBlack, fontSize: 15, fontWeight: 500}, props.style]} />
}
