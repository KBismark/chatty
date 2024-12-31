import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View, Platform, KeyboardAvoidingView, KeyboardEvent, ViewStyle, TextStyle, ImageStyle } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { GradientBackground } from "./commons/gradient";
import { Text, useTheme } from "@/theme/Theme";
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { StatusHead } from "./status";
import { router } from "expo-router";
import { useUserStore } from "@/stores/users";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Message } from "@/stores/types";
import { useMainAccountStore } from "@/stores";
import { ChatMessage } from "./message";
import { isAndroid, SCREEN_WIDTH } from "@/constants/Screen";
import { useAllChatMessageIds, useAllChatMessages } from "@/stores/messages";
import { Keyboard } from "react-native";
import * as Animatable from 'react-native-animatable'




export const PeerConversation = memo(({userId}: {userId: string})=>{
    const {mode,colors} = useTheme();
    const {id: mainUserId, name: mainUserName} = useMainAccountStore({watch: []})
    const {last,name: alienUserName} = useUserStore({userId, watch: []});
    const allMessageIds = useAllChatMessageIds({alienUserId: userId});
    
    const background = mode==='dark'?'rgb(0,0,0)':colors.background;

    

    return (
            <KeyboardAvoidingView 
                behavior={!isAndroid ? 'padding' : undefined}
                keyboardVerticalOffset={!isAndroid ? 100 : 0}
                style={{ flex: 1,  backgroundColor: background,}}
            >
                <Header userId={userId} />
                <SwipeableFlatList
                    initialNumToRender={15}
                    ListFooterComponent={
                        <View style={{marginVertical: '15%'}} />
                    }
                    data={allMessageIds}
                    keyExtractor={(item, index) => `${item}`}
                    renderItem={({item,index})=> <ChatMessage messageId={item} alienUserId={userId} mainUserId={mainUserId} />}
                    swipeableProps={{
                        enabled: true ,
                        friction: 2,
                        rightThreshold: SCREEN_WIDTH,
                        leftThreshold: 200,
                        overshootLeft: false,
                        overshootRight: false,
                        overshootFriction: 10,
                        useNativeAnimations: true,
                        dragOffsetFromRightEdge: 100,
                        onSwipeableWillClose(){},
                        onSwipeableOpen: (direction) => {
                            console.log('Swipe opened:', direction);
                        },
                        onSwipeableWillOpen: (direction) => {
                            console.log('Swipe will open:', direction);
                        },
                        
                    }}
                    renderRightActions={()=>{
                        return <Reply />
                    }}
                
                    ListEmptyComponent={
                        <View style={{flex: 1, backgroundColor: background,}}>

                        </View>
                    }

                    contentContainerStyle={{paddingTop: 60}}
                />
                
                <Footer userId={userId} />
            </KeyboardAvoidingView>
    );
})

const Reply = ()=>{
    const {colors} = useTheme()
    return (
        <View style={[styles.displayRow, {flex: 1, width: '100%', justifyContent: 'flex-end',marginRight: 0 }]}>
            <View style={[styles.displayRow, { width: 75, right: 0, justifyContent: 'flex-end', }]}>
                <MaterialCommunityIcons name='reply' size={18} color={colors.fadedBlack} style={{marginBottom: -7,}} />
            </View>
        </View>
    )
}

const Header = memo(({userId}: {userId: string})=>{
    const {colors} = useTheme();
    let {name, contact} = useUserStore({userId, watch: ['name', 'last']}); 

    
        let alienUserName = name;
        let firstName = name;
        [name, alienUserName, firstName] = useMemo(()=>{
            name = (name||contact||'Unknown').trim();
            firstName = name.split(' ').shift() as string;
            firstName = firstName.length>=20?`${firstName.slice(0,17)}...`:firstName;
            alienUserName = name.length>=32?`${name.slice(0, 29)}...`:name;
            return [name, alienUserName, firstName]
        },[name])

    const onBack = useCallback(()=>{
        router.back()
    },[])

    return (
        <View style={[styles.displayRow, {width: '100%', height: 60, backgroundColor: colors.white, justifyContent: 'space-between', position: 'absolute', top: 0, zIndex: 999 }]}>
            <View style={styles.displayRow}>
                <Pressable onPress={onBack} style={{marginLeft: 10, marginRight: 10,}}>
                    <MaterialCommunityIcons name='chevron-left' color={colors.fadedBlack} size={30} />
                </Pressable>
                <TouchableOpacity style={styles.displayRow}>
                    <StatusHead propsSource={userId} size={35} stripMargin={true}  />
                    <View style={{marginLeft: 10,}}>
                        <Text style={{fontWeight: 700, fontSize: 13, color: colors.black}}>{firstName}</Text>
                        <Text style={{fontWeight: 700, fontSize: 12, color: colors.fadedBlack}}>Last seen <Text style={{fontSize: 8}}> ● </Text> Recently</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.displayRow}>
                <Pressable onPress={undefined} style={styles.callIconContainer}>
                    <Feather name='video' color={colors.fadedBlack} size={28} />
                </Pressable>
                <Pressable onPress={undefined} style={styles.callIconContainer}>
                    <Feather name='phone' color={colors.fadedBlack} size={24} />
                </Pressable>
            </View>
        </View>
    )
})

const receivedMessageBackgroundColors = [
    'rgba(60, 182, 195, 0.73)',  // Turquoise
    'rgba(138, 154, 218, 0.64)'  // Sea green
]

const sentMessageBackgroundColors = [
    'rgba(79, 203, 162, 0.64)',  // Sea green
    'rgba(60, 182, 195, 0.73)'  // Turquoise
]

const replyReceivedMessageBackgroundColors = [
    'rgba(60, 182, 195, 0.05)', // Turquoise
    'rgba(79, 203, 162, 0.05)'  // Sea green
];

const replySentMessageBackgroundColors = [
    'rgba(79, 203, 162, 0.05)',  // Sea green
    'rgba(60, 182, 195, 0.05)' // Turquoise
    
]

const Footer = memo(({userId}: {userId: string})=>{
    const {colors, mode} = useTheme();
    const [message, setMessage] = useState('')
    const [replyOn, setReplyStatus] = useState(true)
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        if (!isAndroid) {
            const showSubscription = Keyboard.addListener('keyboardWillShow', (e: KeyboardEvent) => {
                setKeyboardHeight(e.endCoordinates.height);
            });
            const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
                setKeyboardHeight(0);
            });

            return () => {
                showSubscription.remove();
                hideSubscription.remove();
            };
        }
    }, []);

    const onChangeText = useCallback((text: string)=>{
        setMessage(text)
    },[message])

    const onCloseReply = useCallback(()=>{
        setReplyStatus(false)
    },[replyOn])

    const replyMessage = "What's up  What's up What's adpp at's up  What's up What's a at's up  What's up What's a"

    const keyboardEntryAnimation: Animatable.CustomAnimation<ViewStyle&TextStyle&ImageStyle> = {
        from: {marginBottom: 0},
        to: {marginBottom: keyboardHeight}
    }
    return (
        <Animatable.View duration={300} animation={keyboardEntryAnimation} style={[styles.footerContainer, {backgroundColor: colors.white,marginBottom: isAndroid?undefined:keyboardHeight}]}>
            {
                replyOn&&
                <GradientBackground colors={replyReceivedMessageBackgroundColors} style={{...styles.displayRow, justifyContent: 'space-between', paddingRight: 15,paddingBottom: 5, backgroundColor: colors.highlights, borderRadius: 6, marginBottom: 5,}}>
                    <View style={[styles.displayRow]}>
                        <GradientBackground colors={receivedMessageBackgroundColors} style={{...styles.displayRow, justifyContent: 'center', padding: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeftColor: colors.secondary, borderLeftWidth: 4, }}>
                            <MaterialCommunityIcons name='reply-all-outline' size={18} color={'#ffffff'} />
                        </GradientBackground>
                        <Text style={{fontWeight: 500, fontSize: 13, color: colors.black, paddingLeft: 10, paddingRight: 6, maxWidth: SCREEN_WIDTH - 100, }}>
                            {replyMessage.length>=64?`${replyMessage.slice(0, 64).trim()}...`:replyMessage}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onCloseReply}>
                        <MaterialCommunityIcons name='close' size={18} color={colors.black} />
                    </TouchableOpacity>
                </GradientBackground>
            }
            <View style={[styles.displayRow, { justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 15,}]}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='plus' size={28} color={colors.primary} />
                </TouchableOpacity>
                <TextInput onChangeText={onChangeText} value={message} keyboardAppearance={mode as any} selectionColor={colors.primary} selectionHandleColor={colors.primary} placeholderTextColor={colors.fadedBlack} placeholder="Type message" multiline={true} cursorColor={colors.primary}  style={[styles.textInput, {backgroundColor: colors.searchBar, color: colors.black,}]} />
                <TouchableOpacity>
                    <MaterialIcons name={message.trim().length<=0?'keyboard-voice':'send'} size={28} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </Animatable.View>
    )
})



const styles = StyleSheet.create({
    displayRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footerContainer: {width: '100%', minHeight: 50, position: 'absolute', bottom: 0, paddingVertical: 10, },
    textInput: {width: SCREEN_WIDTH-100, borderRadius: 16, paddingHorizontal: 15, paddingVertical: 10,marginBottom: -3, maxHeight: 95, lineHeight:19, fontSize: 14.5, fontWeight: 500  },
    callIconContainer: {marginHorizontal: 10, }
})