
import { Stories } from '@/components/storyrows';
import { useTheme } from '@/theme/Theme';
import { StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Story() {
  const {white} = useTheme().colors

  return (
  <GestureHandlerRootView style={styles.container}>
       
        <SafeAreaView style={[styles.container, {backgroundColor: white}]}>
          <Stories />
        </SafeAreaView>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
