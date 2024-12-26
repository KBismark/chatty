import { memo, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
import { SCREEN_WIDTH } from "@/constants/Screen";
import { useAllChatMessageIds, useAllChatMessages } from "@/stores/messages";




export const PeerConversation = memo(({userId}: {userId: string})=>{
    const {mode,colors} = useTheme();
    const {id: mainUserId, name: mainUserName} = useMainAccountStore({watch: []})
    const {last,name: alienUserName} = useUserStore({userId, watch: []});
    const allMessageIds = useAllChatMessageIds({alienUserId: userId});
    
    const background = mode==='dark'?'rgb(0,0,0)':colors.background;

    return (
            <View style={{flex: 1, backgroundColor: background,}}>
                <Header userId={userId} />
                <SwipeableFlatList
                    initialNumToRender={15}
                    ListFooterComponent={
                        <View style={{marginVertical: '15%'}} />
                    }
                    data={allMessageIds}
                    keyExtractor={(item, index) => `${item}`}
                    renderItem={({item,index})=> <ChatMessage messageId={item} alienUserId={userId} mainUserId={mainUserId} />}
                    renderRightActions={()=>{
                        return (
                            <View style={[styles.displayRow, {flex: 1, width: '100%', justifyContent: 'space-between', }]}>
                                <View style={[styles.displayRow, { width: '100%', right: 0, justifyContent: 'flex-end', paddingRight: '15%' }]}>
                                    <MaterialCommunityIcons name='reply' size={22} color={colors.fadedBlack} style={{marginBottom: -7,}} />
                                </View>
                            </View>
                        )
                    }}
                
                    ListEmptyComponent={
                        <View style={{flex: 1, backgroundColor: background,}}>

                        </View>
                    }

                    contentContainerStyle={{paddingTop: 60}}
                />
                <Footer userId={userId} />
            </View>
    );
})



const Header = memo(({userId}: {userId: string})=>{
    const {colors} = useTheme();
    let {name, contact} = useUserStore({userId, watch: ['last', 'name']}); // Watching for all changes in user store

    
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
                        <Text style={{fontWeight: 700, fontSize: 12, color: colors.fadedBlack}}>Last seen ● Recently</Text>
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
    const {colors} = useTheme()
    return (
        <View style={[styles.footerContainer, {backgroundColor: colors.white,}]}>
            <GradientBackground colors={replyReceivedMessageBackgroundColors} style={{...styles.displayRow, justifyContent: 'space-between', paddingRight: 15,paddingBottom: 5, backgroundColor: colors.highlights, borderRadius: 6, marginBottom: 5,}}>
                <View style={[styles.displayRow]}>
                    <GradientBackground colors={receivedMessageBackgroundColors} style={{...styles.displayRow, justifyContent: 'center', padding: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeftColor: colors.secondary, borderLeftWidth: 4, }}>
                        <MaterialCommunityIcons name='reply-all-outline' size={18} color={'#ffffff'} />
                    </GradientBackground>
                    <Text style={{fontWeight: 500, fontSize: 12, color: colors.black, paddingLeft: 10, paddingRight: 6, maxWidth: SCREEN_WIDTH - 100, }}>{"Yeah. What's up What's up What's What's up What's up What's  What's up What's up What's up What's  What What's up What's up What's  What What's up What's up What's  What What's up What's up What's  What"}</Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='close' size={18} color={colors.black} />
                </TouchableOpacity>
            </GradientBackground>
            <View style={[styles.displayRow, { justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 15,}]}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='plus' size={24} color={colors.primary} />
                </TouchableOpacity>
                <TextInput selectionColor={colors.primary} selectionHandleColor={colors.primary} placeholderTextColor={colors.fadedBlack} placeholder="Type message" multiline={true} cursorColor={colors.primary}  style={[styles.textInput, {backgroundColor: colors.searchBar, color: colors.black,}]} />
                <TouchableOpacity>
                    <MaterialIcons name='keyboard-voice' size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    )
})



const styles = StyleSheet.create({
    displayRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footerContainer: {width: '100%', minHeight: 50, position: 'absolute', bottom: 0, paddingVertical: 10, },
    textInput: {width: SCREEN_WIDTH-100, borderRadius: 16, paddingHorizontal: 15, paddingVertical: 8,marginBottom: -3, maxHeight: 90,  },
    callIconContainer: {marginHorizontal: 10, }
})