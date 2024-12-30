import * as Animatable from 'react-native-animatable';
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "@/theme/Theme";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { ProfileHeadSizeWithMargin, StatusHead } from "./status";
import { memo, useCallback, useMemo, useState } from "react";
import { Tabs, useGlobalTabStore } from "@/stores/tabs";
import { GradientBackground } from "./commons/gradient";
import { AppStoryRing} from "./commons/rings";
import { useUserStore } from "@/stores/users";
import { router } from 'expo-router';
import { createChatMessageStore } from '@/stores/messages';
import { useMainAccountStore } from '@/stores';
import { Message } from '@/stores/types';
import { SwipeListView } from 'react-native-swipe-list-view';


const widthWithNoHead = SCREEN_WIDTH-ProfileHeadSizeWithMargin
const messageSliceSpace = widthWithNoHead - 60;

const rowEntryAnimation = {
    from: {transform: [{translateY: -20}]},
    to: {transform: [{translateY: 0}]},
}

const getRandomMessageIndicatorNumber = ()=> (Math.floor(Math.random() * 1000) %  99) + 1;


export const Row = memo(({propsSource:userId, ring, disableSwipe}: {propsSource:string, ring?: boolean, disableSwipe?:boolean})=>{
    const {colors, mode} =  useTheme();
    let {name, contact, last, isUser} = useUserStore({userId, watch: ['last']}); // Watching for all changes in user store
    const {activeTab} = useGlobalTabStore({watch: ['activeTab']})
    const [pressing, setPressing] = useState(false);

    const {white, divider, black, highlights} = colors;
    const hideMessageIndicators = (['search'] as Tabs[]).includes(activeTab)||!isUser||!last.messagePreview;
    
    let alienUserName = name;
    let firstName = name;
    [name, alienUserName, firstName] = useMemo(()=>{
        name = (name||contact||'Unknown').trim();
        firstName = name.split(' ').shift() as string;
        firstName = firstName.length>=20?`${firstName.slice(0,17)}...`:firstName;
        alienUserName = name.length>=32?`${name.slice(0, 29)}...`:name;
        return [name, alienUserName, firstName]
    },[name])

    
    
    let previewedMessage = useMemo(()=>{
        let previewedMessage = !isUser?
        `Invite ${firstName} to start conversation.`:
        last.messagePreview? last.messagePreview.trim():
        `Send a message to ${firstName} to start a conversation.`;
        
        previewedMessage = last.messagePreview&&previewedMessage.length>=50?`${previewedMessage.slice(0,47).trim()}...`: previewedMessage
        
        return previewedMessage;
    },[isUser, last.messagePreview?.slice(0,50)])

    const innerStyles = useMemo(()=>{
        return {
            container: {backgroundColor: white,},
            nameText: {fontWeight: '700', fontSize: 16, color: black},
        }
    },[mode])

    const pressableStyle = useMemo(()=>{
        return [styles.displayRow, styles.row, {backgroundColor: pressing? highlights: white, borderTopColor: divider,}]
    },[mode, pressing])

    const {id: mainUserId, name: mainUserName} = useMainAccountStore({watch: []})
    const sampleReceivedMessage: Message = {
        id: `${mainUserId}-${userId}-0`,
        time: '06:24',
        senderId: userId,
        successCount: 'final',
        type: 'normal',
        data: {
            text: last.messagePreview||`Hello👋 ${mainUserName}. What's up.`
        }
    };
    const sampleSentMessage: Message = {
        id: `${mainUserId}-${userId}-1`,
        time: '06:23',
        senderId: mainUserId,
        successCount: 'final',
        type: 'normal',
        data: {
            text: `Hi👋 ${alienUserName}. How may I help you?`
        }
    }

    const onPressed = useCallback(()=>{
        // Create two chat messages in the conversation database
        createChatMessageStore({alienUserId: userId, store: sampleSentMessage })
        createChatMessageStore({alienUserId: userId, store: sampleReceivedMessage })

        router.push({
            pathname: '/chat/[userId]',
            params: {userId}
        })
    },[])

    const onPressedIn = useCallback(()=>{
        setPressing(true)
    },[pressing])
    const onPressedOut = useCallback(()=>{
        setPressing(false)
    },[pressing])
    
    return (
        <View  style={innerStyles.container}>
            <Pressable onPress={onPressed} onPressIn={onPressedIn} onPressOut={onPressedOut}  style={pressableStyle}>
                {
                    ring?
                    <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                        <StatusHead stripMargin={true} propsSource={userId} size={54} />
                    </AppStoryRing>
                    :
                    <StatusHead propsSource={userId} size={60} />
                }
                <View style={styles.messageNoHead}>
                    <View style={styles.displayRow}>
                        <Text style={innerStyles.nameText as any}>{!isUser?alienUserName: firstName}</Text>
                        {!hideMessageIndicators&&<Text style={styles.messageDate}>{last.date||'01/24'}</Text>}
                    </View>
                    <View style={styles.displayRow}>
                        <Text style={styles.messageSlice}>
                            {previewedMessage}
                        </Text>
                        {
                            !hideMessageIndicators&&
                            <View>
                                <MessageIndicator propsSource={userId} />
                            </View>
                        }
                        
                    </View>
                </View>
            </Pressable>
        </View>
    )
})

const MessageIndicator = memo(({propsSource:userId}: {propsSource: string})=>{
    const {primary} = useTheme().colors;
    const number = getRandomMessageIndicatorNumber();
    const paddings = {paddingVertical: 5, paddingHorizontal: number<10?9:6}
    return (
        <GradientBackground style={{backgroundColor: primary, borderRadius: 15,}}>
            <View style={styles.messageIndicator}>
                <Text style={[styles.indicatorText, paddings]}>{number}</Text>
            </View>
        </GradientBackground>
    )
})


const styles = StyleSheet.create({
    round: {
        borderRadius: 9999,
        width: 60, height: 60,
        marginHorizontal: 15
    },
    displayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row:{
        borderTopWidth: 1,
        paddingVertical: 8,
    },
    messageIndicator: {
        borderWidth: 0,
        borderColor: 'rgba(0,0,0,0)',
        borderRadius: 15, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicatorText: {color: '#ffffff', fontSize: 12, fontWeight: 500, margin: 0,  },
    messageSlice: {fontSize: 12.5,marginRight: 5, maxWidth: messageSliceSpace},
    messageDate: {fontSize: 12},    
    messageNoHead: {width: widthWithNoHead, paddingRight: 10},
    messageChevron: {marginLeft: 15},


})


