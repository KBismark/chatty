import { memo } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { GradientBackground } from "./commons/gradient";
import { Message } from "@/stores/types";
import { Text, useTheme } from "@/theme/Theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useChatMessageStore } from "@/stores/messages";


const receivedMessageBackgroundColors = [
    'rgba(60, 182, 195, 0.43)',  // Turquoise
    'rgba(138, 154, 218, 0.34)'  // Sea green
]

const sentMessageBackgroundColors = [
    'rgba(79, 203, 162, 0.34)',  // Sea green
    'rgba(60, 182, 195, 0.43)'  // Turquoise
]

interface MessageProps  {
    mainUserId: string;
    alienUserId: string;
    messageId: string;
}
export const ChatMessage = memo(({mainUserId, alienUserId, messageId}: MessageProps)=>{
    const {colors} = useTheme()
    const {senderId, successCount, id, time, data: {text, media, repliedMessageId}} = useChatMessageStore({alienUserId, messageId, watch: []})
    
    const isSentMessage = mainUserId===senderId

    let statusIcon = 'check';
    let statusIconColor = colors.black
    switch (successCount) {
        case 'failed':
            statusIcon = 'alert-circle'
            statusIconColor = colors.danger
            break;
        case 'second':
            statusIcon = 'check-all'
            break;
        case 'final': 
            statusIcon = 'check-all'
            statusIconColor = colors.primary
            break;
    }

    return (
        <View style={[styles.container, {justifyContent: isSentMessage?'flex-end':'flex-start', }]}>
            <GradientBackground colors={isSentMessage? sentMessageBackgroundColors: receivedMessageBackgroundColors} style={{...styles.messageContainer, }}>
                <Text style={{fontWeight: 500, fontSize: 13, color: colors.black, }}>{text}</Text>
                <View style={[styles.displayRow, {justifyContent: 'flex-end',}]}>
                    <Text style={{fontWeight: 400, fontSize: 11, color: colors.black, textAlign: 'right', marginRight: 5, }}>{time}</Text>
                    <MaterialCommunityIcons name={statusIcon as any} size={16} color={statusIconColor} />
                </View>
            </GradientBackground>
        </View>
    )
})



const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        marginTop: 10,
    },
    messageContainer: {
        maxWidth: '86%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 11,
    },
    displayRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})