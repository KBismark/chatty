
import { isAndroid } from "./Screen";


const Theme = {
  light: {
    mode: 'light',
    colors:{
      primary: 'rgb(60, 195, 150)',
      secondary: 'rgb(60, 182, 195)',
      white: '#FFFFFF',
      black: '#4d474a',
      divider: '#f3f3f3',
      text: '#242424',
      searchBar: '#f1f1f1',
      fadedBlack: '#3a3a3a',
      highlights: 'rgb(246, 246, 248)',
      emphasis: 'rgb(241, 251, 255)',
      neutral: '#EFF0F3',
      background: '#fff9f9',
      gray0: '#fff9f9',
      gray1: '#EFF0F3',
      danger: '#E23131',
      blurColor:'rgba(255, 255, 255, 1)',
    },
    
  },
  dark: {
    mode: 'dark',
    colors:{
      primary: 'rgb(60, 195, 150)', 
      secondary: 'rgb(60, 182, 195)',
      white: '#151617',
      black: 'rgb(185, 183, 184)',
      text: '#242424',
      searchBar: 'rgba(31, 31, 31, 1)',
      fadedBlack: '#686868',
      highlights: 'rgba(104, 104, 104, 0.1)',
      emphasis: 'rgba(104, 104, 104, 0.2)',
      neutral: '#EFF0F3',
      background: '#000000',
      gray0: 'rgb(15, 15, 19)',
      gray1: 'rgb(72, 74, 74)',
      divider: 'rgba(54, 54, 54, 0.25)',
      danger: '#E23131',
      blurColor: isAndroid?'rgba(0, 0, 0, 0.95)': 'rgba(0, 0, 0, 0.6)',
    },
    
    
  },
};

export default Theme;