import { Conversations } from '@/components/chatrows';
import { StatusHead } from '@/components/status';
import { useTheme } from '@/theme/Theme';
import { updateGlobalTabStore } from '@/stores/tabs';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Home() {
  const {white} = useTheme().colors
  
  return (
  <GestureHandlerRootView style={styles.container}>
       
        <SafeAreaView style={[styles.container, {backgroundColor: white}]}>
          <Conversations />
        </SafeAreaView>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
