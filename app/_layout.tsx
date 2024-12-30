import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { memo, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Contacts from 'expo-contacts';
import { AppThemeProvider, useTheme } from '../theme/Theme';
import { User } from "@/stores/types";
import { updateMainAccountStore } from '@/stores';
import { fakeUsers } from '@/stores/data';
import { createUserStore } from '@/stores/users';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const getPrimaryPhone = (phoneData: any,index: number)=>phoneData.isPrimary
function RootLayoutNav() {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.FirstName, Contacts.Fields.ID, Contacts.Fields.PhoneNumbers, Contacts.Fields.PhoneticFirstName],
          });

          const userIds: string[] = [];

          if (false&&data.length > 0) {
            data.forEach((contact, index)=>{

              if(!contact.phoneNumbers||contact.phoneNumbers.length<1) return;

              let primary = contact.phoneNumbers.find(getPrimaryPhone);
              if(!primary){
                primary = contact.phoneNumbers[0];
              }

              const id = `${primary.countryCode}-${primary.digits}`;
              createUserStore({
                userId: id, 
                store: {
                  contact: primary.number, id, name: contact.name, 
                  last: {failed: false, date: '01/12', messagePreview: ''} 
                }
              });

              userIds.push(id);
            })
          }else{
            fakeUsers.forEach((user)=>{
              createUserStore({userId: user.id, store: user});
              userIds.push(user.id);
            })
          }

          updateMainAccountStore({actors: ['contactList'], store: {contactList: userIds}});
          
          setReady(true);
        }
      } catch (error) {

        const userIds: string[] = [];

        const fakeUsers: User[] = (new Array(8)).map((e, i)=>{
          let digits = ''
          while(digits.length<9) digits=`${digits}${i}`;

          return {id: `233-${digits}`, contact: `233-${digits}`, name: `User ${i+1}`, last: {failed: false, date: `0${3+i}/0${i+1}`, messagePreview: ''} }
        });

        fakeUsers.forEach((user)=>{
          createUserStore({userId: user.id, store: user});
          userIds.push(user.id);
        })

        updateMainAccountStore({actors: ['contactList'], store: {contactList: userIds}});

        setReady(true);
      }
    })();

  }, []);
  
  
  if(!ready) return null;
  return (
    <SafeAreaProvider>
          <AppThemeProvider >
            <App />
          </AppThemeProvider>
    </SafeAreaProvider>
  );
}


const screenOptions = {headerShown: false}

const App = memo(()=>{
  const {colors, mode} = useTheme();
  styles.container.backgroundColor = colors.background
  return (
    <>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen name="(tabs)" options={screenOptions} />
          <Stack.Screen name="chat/[userId]" options={{...screenOptions, animation: 'ios_from_right'}} />
        </Stack>
      </View>
      <StatusBar style={mode==='dark'?'light': 'dark'} />
    </>
  )
})

const styles = StyleSheet.create({
  container: {backgroundColor: '#ffffff',flex: 1}
})