import React, { useState, useRef, useEffect, memo } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    View,
} from 'react-native';

import SwipeableFlatList from 'rn-gesture-swipeable-flatlist';
import { StatusHead } from './status';
import { Row } from './chatrow';
import { getStore, updateStore, useStateStore } from 'statestorejs';
import { UI } from '@/stores/types';
import { Text, useTheme } from '@/theme/Theme';
import * as Animatable from 'react-native-animatable'
import { SearchBar } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons';
import { SearchTabData, updateSearchTabStore, useSearchTabStore } from '@/stores/tabs/search';
import { getLatestStoryUIStore, updateLatestStoryUIStore, useLatestStoryUIStore } from '@/stores/ui';
import { useMainAccountStore } from '@/stores';
import { FlatList } from 'react-native-gesture-handler';

let screenScrollInfo: UI;
function SearchComponent() {
    const {colors} = useTheme()
    const {contactList} = useMainAccountStore({watch: ['contactList']})
    const {isSearching} = useSearchTabStore({watch: ['isSearching']});

    let data: (string|{title:string})[];
    if(isSearching){
        data = []
    }else{
        data = [{title: 'Recents'}, ...contactList.slice(0, 2), {title: 'People you may know'}, ...contactList.slice(2, 6), {title: 'Send invitation to your contacts'}, ...contactList.slice(6, 11) ]
    }

    return (
    <View>
        <FlatList
            stickyHeaderIndices={[0]}
            initialNumToRender={15}
            ListHeaderComponent={()=>{
                return (
                    <>
                        <Header />
                        
                    </>
                )
            }}
            ListFooterComponent={
                <View style={{marginVertical: '15%'}} />
            }
            ListEmptyComponent={()=>{
                const {colors} = useTheme()
                return (
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                        <ActivityIndicator size={'large'} color={colors.primary} />
                    </View>
                )
            }}
            style={{
                backgroundColor: colors.white,
                height: '100%'
            }}
            data={data as any}
            keyExtractor={(item) => typeof item === 'object' ? (item as any).title: item}
            renderItem={RenderItem}
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

const RenderItem = ({item, index}: {item: string, index:number}) => {
    
    if(typeof item === 'object') return <SectionHead title={(item as any).title} />;
    if([1,4,5].includes(index)){
        return (
            <Row propsSource={item} ring={true} />
        )
    }
    return <Row propsSource={item}/>
};

const SectionHead = memo(({title}:{title: string})=>{
    const {colors, mode} = useTheme();
    const background = mode === 'dark'? '#000000': colors.white;
    return (
        <View style={{backgroundColor: background, paddingBottom: 5, paddingTop: 10, paddingHorizontal: 15,}}>
            <Text style={{fontSize: 16, color: colors.fadedBlack,}}>
                {title}
            </Text>
        </View>
    )
})

const Header = memo(()=>{
    const {white, black, searchBar, fadedBlack, primary} = useTheme().colors;
    let {chatHeaderScroll, searchSearchOn} = useLatestStoryUIStore({watch: ['chatHeaderScroll', 'searchSearchOn']});
    const {seacrhText} = useSearchTabStore({watch: ['seacrhText']})
    
    const [animation, animation_2] = getScrollAnimation(chatHeaderScroll);
    const searchFocusAnimation = searchSearchOn ?  animationSets.set3[0] : animationSets.set3[1];

    
    return (
       <View>
            <View style={{ width: '100%', backgroundColor: white, marginHorizontal: 0 }}>
                <Animatable.View animation={searchFocusAnimation} duration={300} style={[styles.displayRow]}>
                    <View>
                        <Animatable.Text animation={ searchSearchOn? undefined: animation } duration={300} style={[styles.heading, {color: black}]}>Search</Animatable.Text>
                    </View>
                    <Animatable.View animation={searchSearchOn? undefined: animation_2} duration={300} style={{marginRight: 5}}>
                        <StatusHead propsSource='' size={40} isMainUser={true} />
                    </Animatable.View>
                </Animatable.View>
            </View>
            <Animatable.View style={[styles.displayRow, { width: '100%', backgroundColor: white, marginHorizontal: 0 }]}>
                <SearchBar 
                    placeholderTextColor={fadedBlack}
                    searchIcon={<Ionicons name='search-outline' size={20}
                        color={fadedBlack}
                        style={{
                            margin: 0
                        }} /> as any}

                    platform={'ios'} placeholder='Search'
                    style={{
                        color: fadedBlack
                    }}
                    containerStyle={{
                        height: 40,
                        marginHorizontal: 8,
                        marginBottom: 5,
                        backgroundColor: white,
                    }}
                    inputContainerStyle={{
                        backgroundColor: searchBar,
                        borderRadius: 8,
                        height: 38,
                    }}

                    clearIcon={{ name: 'close' }}

                    onFocus={() => {
                        updateLatestStoryUIStore( { actors: ['searchSearchOn'], store: { searchSearchOn: true } })
                    } }
                    onCancel={() => {
                        updateLatestStoryUIStore( { actors: ['searchSearchOn'], store: { searchSearchOn: false } })
                    } }
                    onClear={() => {
                        updateLatestStoryUIStore( { actors: ['searchSearchOn'], store: { searchSearchOn: false } })
                    } }
                    onBlur={() => {
                        // TODO: 
                        // if(/* if search input value is empty, set to false */){
                            updateLatestStoryUIStore( { actors: ['searchSearchOn'], store: { searchSearchOn: false } })
                        // }
                    } } onChangeText={(text: string)=>{
                        getStore<SearchTabData, void>('tabs', 'search',({isSearching, seacrhText})=>{
                            const trimedText = text.trim();
                            if(seacrhText===trimedText){ // No change in text value
                                updateSearchTabStore({actors: ['seacrhText'], store: {seacrhText: text}})
                                return
                            }
                            const actors: (keyof SearchTabData)[] = ['seacrhText']
                            const update = {seacrhText: text, isSearching}
                            if(trimedText.length>3){
                                update.isSearching = true
                                if(!isSearching){
                                    actors.push('isSearching')
                                }
                            }else{
                                update.isSearching = false
                                if(isSearching){
                                    actors.push('isSearching')
                                }
                            }
                            updateSearchTabStore({actors, store: update})
                        })

                    }} value={seacrhText} showLoading={false}  cancelButtonTitle={'Cancel'} cancelButtonProps={{color: primary}} showCancel={false} />
            </Animatable.View>
       </View>
    )
})

export const Search = memo(SearchComponent)


const animationSets = {
    set1: [
        {
            from: {
                transform: [{scale: 0.7}, {translateX: -25}]
            },
            to: {
                transform: [{scale: 1}, {translateX: 0}]
            }
        },
        {
            from: {
                transform: [ {translateY: 0}],
                opacity: 1
            },
            to: {
                transform: [ {translateY: 20}],
                opacity: 0
            }
        }
    ],
    set2: [
        {
            from: {
                transform: [{scale: 1}, {translateX: 0}]
            },
            to: {
                transform: [{scale: 0.7}, {translateX: -25}]
            }
        },
        {
            from: {
                transform: [ {translateY: 20}],
                opacity: 0
            },
            to: {
                transform: [ {translateY: 0}],
                opacity: 1
            }
        }    
    ],
    set3: [
        {
            from: {
                opacity: 1,
                marginTop: 0
            },
            to: {
                opacity: 0,
                marginTop: -50
            }
        },
        {
            from: {
                opacity: 0,
                marginTop: -50
            },
            to: {
                opacity: 1,
                marginTop: 0
            }
        }  
    ]
}
const getScrollAnimation = (scrollPosition: number)=>{
    return scrollPosition<=90? animationSets.set1: animationSets.set2
}


const styles = StyleSheet.create({
    


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

