import { Dimensions, Platform } from "react-native";

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');
export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('screen')
export const isAndroid = Platform.OS === 'android'?true: false;