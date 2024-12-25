import { ContextId, createComponent, useStateStore } from "statestorejs";
import * as Animatable from 'react-native-animatable';
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { SVGProps, memo, useMemo, useState } from "react";
import { Text, useTheme } from "@/theme/Theme";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { UI, UIInit, User } from "@/stores/types";
import { Image } from "expo-image";
import testImage1 from '@/assets/images/test/artistic.jpeg'
import testImage2 from '@/assets/images/test/model.jpg'
import testImage3 from '@/assets/images/test/music.jpg'
import testImage4 from '@/assets/images/test/nature.jpg'
import testImage5 from '@/assets/images/test/soccer.jpg'
import { AppStoryRing } from "./commons/rings";
import { useUserStore } from "@/stores/users";
import { useMainAccountStore } from "@/stores";
import { useLatestStoryUIStore } from "@/stores/ui";

const TestImages = [testImage1, testImage3, testImage4, testImage5];
export const TestProfileImage = testImage2;

export const ProfileHeadSize = 65;
const horizontalMargin = 8;
export const ProfileHeadSizeWithMargin = ProfileHeadSize+ (2*horizontalMargin);

// For testing only
let nextTestImageToUse = 0;
export const  getNextTestImageToUse = ()=>{
    const image = TestImages[nextTestImageToUse];
    nextTestImageToUse++;
    if(nextTestImageToUse>3){
        nextTestImageToUse = 0;
    }
    return image
};

type StatusHeadProp = {propsSource: string, size?: number; isMainUser?: boolean;stripMargin?: boolean};

export const StatusHead = memo(({propsSource:userId, size, isMainUser, stripMargin}: StatusHeadProp)=>{
    const {gray1} = useTheme().colors;
    let {profileImage, name} = useUserStore({userId, watch: ['name', 'profileImage']})||{};
    const mainUserInfo = useMainAccountStore({watch: ['name', 'profileImage']})
    const [loaded, setLoad] = useState(false);

    if(isMainUser){
        profileImage = mainUserInfo.profileImage;
        name = mainUserInfo.name;
    }

    const image = isMainUser?TestProfileImage: profileImage||getNextTestImageToUse();

    return (
        <Pressable style={[styles.round, {backgroundColor: gray1, overflow: 'hidden', marginHorizontal: stripMargin?undefined:horizontalMargin}, (size?{width: size, height: size}:undefined) ]}>
            {/* {!loaded&&<StatusHeadLoading propsSource='' stripMargin={true} size={size} />} */}
            <Image 
                contentFit='cover' 
                source={image} 
                cachePolicy={'memory-disk'} 
                transition={{duration: 400, timing: 'linear'}} 
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}
                onLoad={(e)=>{
                    // setLoad(true)
                    
                }}
                onError={(e)=>{
                    // setLoad(false)
                    
                }}
            />
        </Pressable>
    )
})

const halfWidth = SCREEN_WIDTH * 0.4;

export const LatestStories = memo(()=>{
    const {scroll, activate} = useLatestStoryUIStore({watch: ['scroll']})||UIInit
    const {white, black} = useTheme().colors;
    const inerStyles = useMemo(()=>{
        return {
            container: {width: '100%', backgroundColor: white, zIndex: 5, paddingBottom: 10}
        }
    },[white])

    let shrink = 1-(scroll/20);
    if(shrink<0.7){
        shrink = 0;
    }
    let scrollLeft = scroll*75;
    return (
        <View style={inerStyles.container as any}>
            <View style={{paddingHorizontal: 15, paddingTop: 5}}>
                <Text style={{color: black, fontWeight: 'bold'}}>Stories</Text>
            </View>
            <View style={{marginLeft: 5}}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={[styles.storiesScrll, {marginLeft: scrollLeft+80 }]} >
                    
                    <View style={{transform: [{scale: shrink}]}}>
                        <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                            <StatusHead stripMargin={true} propsSource='' size={54} />
                        </AppStoryRing>
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                            <StatusHead stripMargin={true} propsSource='' size={54} />
                        </AppStoryRing>
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                            <StatusHead stripMargin={true} propsSource='' size={54} />
                        </AppStoryRing>
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                            <StatusHead stripMargin={true} propsSource='' size={54} />
                        </AppStoryRing>
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                            <StatusHead stripMargin={true} propsSource='' size={54} />
                        </AppStoryRing>
                    </View>
                </ScrollView>
            </View>
            <UserStoryHead />
            
        </View>
    )
})

export const UserStoryHead = memo(()=>{
    const {scroll, activate} = useLatestStoryUIStore({watch: ['scroll']})||UIInit
    const {white} = useTheme().colors;
    let first = scroll*150;
    if(first>halfWidth){
        first = halfWidth;
    }
    let moveUp = scroll * 25;
    if(moveUp>50){
        moveUp = 50
    }
    return (
        <Animatable.View style={{backgroundColor: white,borderTopRightRadius: 9999, borderBottomRightRadius: 9999, marginTop: -80 , marginLeft: first, width: 73,  transform: [{scale: 1+scroll}, {translateY: -moveUp}]}}>
            <StatusHead propsSource='' isMainUser={true}  />
        </Animatable.View>
    )
})

export const LatestPromotedStories = memo(()=>{
    const {white, black} = useTheme().colors;
    const inerStyles = useMemo(()=>{
        return {
            container: {width: '100%', backgroundColor: white, zIndex: 5, marginBottom: 0}
        }
    },[white])
    return (
        <View style={inerStyles.container as any}>
            <View style={{paddingHorizontal: 15, paddingTop: 5}}>
                <Text style={{color: black, fontWeight: 'bold'}}>Promoted</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={[styles.storiesScrll, {paddingBottom: 10}]} >
                
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
                <AppStoryRing segments={4} strokeWidth={0} style={{marginHorizontal: 8}} size={60}>
                    <StatusHead stripMargin={true} propsSource='' size={54} />
                </AppStoryRing>
            </ScrollView>
        </View>
    )
})


const StatusHeadLoading = memo(({propsSource, stripMargin, size}: {propsSource?: string; stripMargin?: boolean, size?:number}) => {
    const {white, gray1} = useTheme().colors;
    size = size?size:ProfileHeadSize;
    const diameter = size-5;
    const radius = diameter/2;
    const viewBox = `0 0 ${diameter} ${diameter}`
    return (
        <ContentLoader 
          speed={2}
          width={size}
          height={size}
          viewBox={viewBox}
          backgroundColor={gray1}
          foregroundColor={white}
          style={{
            margin: 0,
            marginHorizontal: stripMargin? 0 : horizontalMargin,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Circle cx={radius} cy={radius} r={radius} />
        </ContentLoader>
    )
})






const styles = StyleSheet.create({
    round: {
        borderRadius: 9999,
        width: ProfileHeadSize, height: ProfileHeadSize,
        marginHorizontal: horizontalMargin,
    },
    storiesScrll: {
        paddingVertical: 15,
    },
    heading: {
        fontSize: 30, fontWeight: 'bold', 
        marginBottom: 15, marginTop:10, 
        marginLeft: 15
    }
})