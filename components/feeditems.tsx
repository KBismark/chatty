import { Text, useTheme } from "@/theme/Theme";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Scrollable } from "react-native-paging-swipper";
import * as Animatable from 'react-native-animatable'
import { ForYouScreen } from "./foryou";
import {GradientBackground} from "./commons/gradient";

const feedScrollGesturedata = Scrollable.getGestureData()
export function Feeds(){

    return (
        <View>
            <Scrollable.FlatListScreenContainer 
                gestureData={feedScrollGesturedata} 
                horizontal={true}
                data={[1,2]}
                renderItem={(data)=><RenderFeedForYou {...data} />}
                sharableTopComponent = {<Header />}
                pagingEnabled={true}
                scrollEnabled={false}
                ListFooterComponent={
                    <View style={{marginVertical: '15%'}} />
                }
            />
        </View>
    )    
}

const RenderFeedForYou = memo(({item, index}:{item:any, index: any})=>{
    return (
        <View style={{flex: 1}}>
            <ForYouScreen />
        </View>
    )
})


const optionsAnimation = {
    from: {
        transform: [{scale: 0.8}, {translateX: -20}]
    },
    to: {
        transform: [{scale: 1}, {translateX: 0}]
    }
}
const nextPage: {
    'For You': 'Following';
    Following: 'For You';
} = {'For You': 'Following', 'Following': 'For You'};

const nextPageNum: {
    'For You': 1;
    Following: 2;
} = {'For You': 1, 'Following':2}

const Header = memo(()=>{
    const {colors, mode} = useTheme();
    const [page, setPage] = useState<keyof typeof nextPage>('For You');
    const [popedUp, setPopUp] = useState(false);
    
    const {white, black, divider} = colors;
   
    const onNextPage = useCallback(()=>{
        const next =  page==='Following'?'For You':'Following';
        setPage(next);
        setPopUp(false);
        feedScrollGesturedata.scrollToIndex&&
        feedScrollGesturedata.scrollToIndex(nextPageNum[next]);
    },[page, popedUp])

    const PopUp = useCallback(()=>{
        setPopUp(!popedUp)
    },[popedUp])
    
    return (
        <View>
            <View style={[styles.displayRow, { width: '100%', backgroundColor: white, marginHorizontal: 15, paddingVertical: 10, borderBottomColor: divider, borderBottomWidth: 1, }]}>
                <TouchableOpacity onPress={PopUp} style={styles.displayRow}>
                    <Text style={[styles.heading, {color: black,textTransform: 'capitalize'}]}>{page}</Text>
                    <Feather name='chevron-right' size={18} color={black} style={{marginTop: -4}} />
                </TouchableOpacity>
                <GradientBackground style={{marginRight: 25, borderRadius: 999, justifyContent: 'center', borderColor: divider, borderWidth: 1,paddingLeft: 15, paddingRight: 10, paddingVertical: 7 }}>
                    <TouchableOpacity style={[styles.displayRow,]}>
                        <Text style={{fontWeight: '500', marginRight: 5, color: '#ffffff' }}>Create</Text>
                        <Feather name='plus' size={20} color={'#ffffff'} />
                    </TouchableOpacity>
                </GradientBackground>
            </View>
           {
             popedUp&&
             <Pressable onPress={onNextPage} style={{position: 'absolute', top: 0, left: 0, marginTop: 20, zIndex: 343,marginLeft: page==='For You'?70:85}}>
                <Animatable.View duration={200} animation={optionsAnimation} style={{overflow: 'hidden', borderRadius: 10,width: 150, marginLeft: 15, marginTop: -15, backgroundColor: white, borderColor: divider, borderWidth: 1,}}>
                    <BlurView intensity={mode === 'dark'?80:0} style={[styles.displayRow, {width: 150, paddingVertical: 5, paddingHorizontal: 15, justifyContent: 'center',}]}>
                        <Text style={[styles.heading, {color: black,textTransform: 'capitalize'}]}>{nextPage[page]}</Text>
                    </BlurView>
                </Animatable.View>
            </Pressable>
           }
            
        </View>
    )
})


const CreatePopup = ()=>{
    const {colors, mode} = useTheme();
    const {white, black, divider} = colors;

    return (
        <View style={[styles.displayRow, {display: 'flex'}]}>
                <View></View>
                <Animatable.View duration={200} animation={optionsAnimation} style={{overflow: 'hidden', borderRadius: 10, maxWidth: 260, marginRight: 15, marginTop: -3, backgroundColor: white, borderColor: divider, borderWidth: 1,}}>
                    <BlurView intensity={mode === 'dark'?80:0} style={[styles.displayRow, {maxWidth: 260, paddingVertical: 3, paddingHorizontal: 15, justifyContent: 'center', flexDirection: 'column' }]}>
                        <TouchableOpacity style={[styles.displayRow, {paddingVertical: 10, borderBottomColor: divider, borderBottomWidth: 1, width: '100%'}]}>
                           <View style={styles.displayRow}>
                                <Feather name='credit-card' size={22} color={black} />
                                <Text style={[styles.heading, {color: black, marginLeft: 10}]}>Create with payment</Text>
                           </View>
                           <View></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.displayRow, {paddingVertical: 10, width: '100%'}]}>
                            <View style={styles.displayRow}>
                                <Feather name='credit-card' size={22} color={black} />
                                <Text style={[styles.heading, {color: black, marginLeft: 10}]}>Create with no payment</Text>
                           </View>
                           <View></View>
                        </TouchableOpacity>
                    </BlurView>
                </Animatable.View>
            </View>
    )
}

const styles = StyleSheet.create({

    displayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heading: {
        fontWeight: 'bold', 
        paddingBottom: 10, paddingTop:5, 
    }
});

