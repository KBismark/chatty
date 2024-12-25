
import { Feeds } from '@/components/feeditems';
import { useTheme } from '@/theme/Theme';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Home() {
  const {white} = useTheme().colors
  return (
  <View style={styles.container}>
       
        <SafeAreaView style={[styles.container, {backgroundColor: white}]}>
          <Feeds />
        </SafeAreaView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
