import React, { memo, forwardRef } from 'react';
import { StyleSheet,View } from 'react-native';
import SwipeableFlatList from 'rn-gesture-swipeable-flatlist';
import { LatestStories, StatusHead } from './status';
import { Row } from './chatrow';
import { useStateStore } from 'statestorejs';
import { AccountUser, UI } from '@/stores/types';
import { Text, useTheme } from '@/theme/Theme';
import * as Animatable from 'react-native-animatable'
import { getLatestStoryUIStore, updateLatestStoryUIStore, useLatestStoryUIStore } from '@/stores/ui';
import { useMainAccountStore } from '@/stores';

let screenScrollInfo: UI;
export function Chats() {
    const {contactList, id} = useStateStore<AccountUser>('account', 'main', ['contactList'])||{contactList: []};
    const data = contactList.slice().reverse();
    return (
    <View>
        <SwipeableFlatList
            stickyHeaderIndices={[1]}
            initialNumToRender={15}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={()=>{
                return (
                    <LatestStories />
                )
            }}
            ListFooterComponent={
                <View style={{marginVertical: '15%'}} />
            }
            data={['First item renders header',...data.slice(0, 9), ...data.slice(14, 18)]}
            keyExtractor={(item) => item}
            renderItem={({item,index})=> <RenderItem index={index} item={item} />}
            renderRightActions={()=><RenderHiddenItem />}
           onScroll={(e)=> {
                let y = e.nativeEvent.contentOffset.y;
                if(y>=-70){
                    if(y<50){
                        screenScrollInfo = getLatestStoryUIStore()
                        
                        if(screenScrollInfo.scroll!==0){
                            updateLatestStoryUIStore({actors: ['scroll'], store: {scroll: 0, activate: false}})
                        }
                        if(screenScrollInfo.chatHeaderScroll!==90){
                            updateLatestStoryUIStore({actors: ['chatHeaderScroll'], store: {chatHeaderScroll: 90}})
                        }
                        return;
                    }
                    
                    if(y<90){
                        screenScrollInfo = getLatestStoryUIStore()
                        if(screenScrollInfo.chatHeaderScroll!==90){
                            updateLatestStoryUIStore({actors: ['chatHeaderScroll'], store: {chatHeaderScroll: 90}})
                        }
                    }else if(y<700){
                        screenScrollInfo = getLatestStoryUIStore()
                        if(screenScrollInfo.chatHeaderScroll!==150){
                            updateLatestStoryUIStore({actors: ['chatHeaderScroll'], store: {chatHeaderScroll: 150}})
                        }
                    }
                    return;
                    
                };

                y = ((-1)*(e.nativeEvent.contentOffset.y+70))/100;

                updateLatestStoryUIStore({actors: ['scroll'], store: {scroll: y}})
                
           }}
        />
    </View>
    );
}

const RenderHiddenItem = memo(() => {
    const {primary} = useTheme().colors
    return (
        <View style={[styles.rowBack, {backgroundColor: primary}]}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight, {backgroundColor: primary}]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    )
});

const RenderItem = memo((data: {item: string, index:number}) => {
    if(data.index===0){
        // List header component was used to display story heads
        // Using first item in list as header
        return <Header />
    }
    return <Row propsSource={data.item}/>
});

const headerAnimations = {
    _1: {
        max90: {
            from: {
                transform: [{scale: 0.7}, {translateX: -25}]
            },
            to: {
                transform: [{scale: 1}, {translateX: 0}]
            }
        },
        min90: {
            from: {
                transform: [{scale: 1}, {translateX: 0}]
            },
            to: {
                transform: [{scale: 0.7}, {translateX: -25}]
            }
        }
    },
    _2: {
        max90: {
            from: {
                transform: [ {translateY: 0}],
                opacity: 1
            },
            to: {
                transform: [ {translateY: 20}],
                opacity: 0
            }
        },
        min90: {
            from: {
                transform: [ {translateY: 20}],
                opacity: 0
            },
            to: {
                transform: [ {translateY: 0}],
                opacity: 1
            }
        }
    }
}

const Header = memo(forwardRef(()=>{
    const {white, black} = useTheme().colors;
    const {id:userId} = useMainAccountStore({watch: []})
    let {chatHeaderScroll} = useLatestStoryUIStore({watch: ['chatHeaderScroll']})||{chatHeaderScroll: 90};
   
    const [animation_1, animation_2] = chatHeaderScroll<=90? 
    [headerAnimations._1.max90, headerAnimations._2.max90]: 
    [headerAnimations._1.min90, headerAnimations._2.min90];

    return (
       <View>
            <View style={[styles.displayRow, { width: '100%', backgroundColor: white, marginHorizontal: 0 }]}>
                <View>
                    <Animatable.Text animation={animation_1} duration={300} style={[styles.heading, {color: black}]}>Chats</Animatable.Text>
                </View>
                <Animatable.View animation={animation_2} duration={300} style={{marginRight: 5}}>
                    <StatusHead propsSource={userId} size={40} isMainUser={true} />
                </Animatable.View>
            </View>
       </View>
    )
}))

export const Conversations = memo(Chats)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },


    displayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 30, fontWeight: 'bold', 
        paddingBottom: 10, paddingTop:5, 
        marginLeft: 15
    }
});

