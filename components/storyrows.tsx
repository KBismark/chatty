import React, { memo } from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import SwipeableFlatList from 'rn-gesture-swipeable-flatlist';
import { LatestPromotedStories} from './status';
import { Row } from './storyrow';
import {UI} from '@/stores/types';
import { Text, useTheme } from '@/theme/Theme';
import * as Animatable from 'react-native-animatable'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { getLatestStoryUIStore, updateLatestStoryUIStore, useLatestStoryUIStore } from '@/stores/ui';
import { useMainAccountStore } from '@/stores';

let screenScrollInfo: UI;
function Status() {
    const {contactList} = useMainAccountStore({watch: ['contactList']});
    
    return (
    <View>
        <SwipeableFlatList
            stickyHeaderIndices={[1]}
            initialNumToRender={15}
            contentContainerStyle={{paddingBottom: 60}}
            ListHeaderComponent={()=>{
                return (
                    <>
                        <LatestPromotedStories />
                        
                    </>
                )
            }}
            ListFooterComponent={
                <View style={{marginVertical: '15%'}} />
            }
            data={['First item renders header',...contactList.slice(0, 18)]}
            keyExtractor={(item) => item}
            renderItem={(data)=><RenderItem {...data} />}
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
                <Text style={styles.backTextWhite}>Mute</Text>
            </View>
        </View>
    )
});

const RenderItem = memo((data: {item: string, index:number}) => {
    if(data.index===0){
        return <Header />
    }
    return <Row propsSource={data.item}/>
});

const Header = memo(()=>{
    const { white, black, fadedBlack, divider, highlights} = useTheme().colors;
    let {chatHeaderScroll} = useLatestStoryUIStore({watch: ['chatHeaderScroll']})||{chatHeaderScroll: 90};
   
    const animation = chatHeaderScroll<=90?{
        from: {
            transform: [{scale: 0.7}, {translateX: -25}]
        },
        to: {
            transform: [{scale: 1}, {translateX: 0}]
        }
    }:{
        from: {
            transform: [{scale: 1}, {translateX: 0}]
        },
        to: {
            transform: [{scale: 0.7}, {translateX: -25}]
        }
    }
    
    return (
       <View>
            <View style={[styles.displayRow, { width: '100%', backgroundColor: white, marginHorizontal: 0 }]}>
                <View>
                    <Animatable.Text animation={animation} duration={300} style={[styles.heading, {color: black}]}>Stories</Animatable.Text>
                </View>
                <View style={[styles.displayRow, {marginRight: 10}]}>
                    <Pressable style={[styles.displayRow, {justifyContent: 'center', padding: 7, backgroundColor: highlights, borderColor: divider, borderWidth: 1, marginLeft: 15, borderRadius: 999}]}>
                        <FontAwesome name='camera' size={20} color={fadedBlack} />
                    </Pressable>
                    <Pressable style={[styles.displayRow, {justifyContent: 'center', padding: 7, backgroundColor: highlights, borderColor: divider, borderWidth: 1, marginLeft: 15, borderRadius: 999}]}>
                        <Feather name='search' size={22} color={fadedBlack} />
                    </Pressable>
                </View>
            </View>
       </View>
    )
})


export const Stories = memo(Status)

const styles = StyleSheet.create({
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
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

