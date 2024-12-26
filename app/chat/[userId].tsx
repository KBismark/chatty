import { PeerConversation } from '@/components/peerchat';
import { useMainAccountStore } from '@/stores';
import { useTheme } from '@/theme/Theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ChatScreen() {
  const {white} = useTheme().colors
  const {userId} = useLocalSearchParams<{userId: string;}>()
  
  return (
  <GestureHandlerRootView style={[styles.container, {backgroundColor: white}]}>
        <SafeAreaView style={[styles.container, {backgroundColor: white}]}>
          <PeerConversation userId={userId} />
        </SafeAreaView>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
