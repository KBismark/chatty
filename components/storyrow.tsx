import * as Animatable from 'react-native-animatable';
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "@/theme/Theme";
import { SCREEN_WIDTH } from "@/constants/Screen";
import { ProfileHeadSizeWithMargin, StatusHead } from "./status";
import { memo, useCallback, useMemo, useState } from "react";
import { GradientBackground } from "./commons/gradient";
import { useUserStore } from "@/stores/users";


const widthWithNoHead = SCREEN_WIDTH-ProfileHeadSizeWithMargin
const messageSliceSpace = widthWithNoHead - 60;

const rowEntryAnimation = {
    from: {transform: [{translateY: -20}]},
    to: {transform: [{translateY: 0}]},
}

export const Row = memo(({propsSource: userId}: {propsSource:string})=>{
    const {colors, mode} =  useTheme();
    const {white, divider, black, highlights} = colors;

    let {name, contact} = useUserStore({userId, watch: []});
    const [pressing, setPressing] = useState(false);
    let nameUsed = name;

    [name, nameUsed] = useMemo(()=>{
        name = name||contact||'Unknown';
        nameUsed = name.trim().slice(0,20).trim();
        nameUsed = nameUsed.length>20?`${nameUsed}...`:nameUsed;
        return [name, nameUsed]
    },[name])

    const innerStyles = useMemo(()=>{
        return {
            container: {backgroundColor: white,},
            nameText: {fontWeight: '700', fontSize: 16, color: black},
        }
    },[mode])

    const pressableStyle = useMemo(()=>{
        return [styles.displayRow, styles.row, {backgroundColor: pressing? highlights: white, borderTopColor: divider,}]
    },[mode, pressing])

    const onPressed = ()=>{
        // setPressing(false)
    }
    const onPressedIn = useCallback(()=>{
        setPressing(true)
    },[pressing])

    const onPressedOut = useCallback(()=>{
        setPressing(false)
    },[pressing])
    

    return (
        <Animatable.View animation={rowEntryAnimation} duration={500} style={innerStyles.container}>
            <Pressable onPress={onPressed} onPressIn={onPressedIn} onPressOut={onPressedOut}  style={pressableStyle}>
                <StatusHead propsSource={userId} size={60} />
                <View style={styles.messageNoHead}>
                    <View style={styles.displayRow}>
                        <Text style={innerStyles.nameText as any}>{nameUsed}</Text>
                    </View>
                    <View style={styles.displayRow}>
                        <Text style={styles.messageSlice}>
                            {'2 hours ago'}
                        </Text>
                        <View>
                            <MessageIndicator propsSource="" />
                        </View>
                    </View>
                </View>
            </Pressable>
        </Animatable.View>
    )
})

const IndicatorAnimation = 
{
    0: {
        transform: [ {scale: 1.2}]
    },
    1: {
        transform: [ {scale: 1}],
    }
};

const MessageIndicator = memo(({propsSource:userId}: {propsSource: string})=>{
    const {primary} = useTheme().colors;
    const number = 8;
    const paddings = {paddingVertical: 5, paddingHorizontal: number<10?9:6}
    return (
        <GradientBackground style={{backgroundColor: primary, borderRadius: 15,}}>
            <Animatable.View animation={IndicatorAnimation} duration={400} style={styles.messageIndicator}>
                <Text style={[styles.indicatorText, paddings]}>{number}</Text>
            </Animatable.View>
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
        justifyContent: 'center',
    },
    indicatorText: {color: '#ffffff', fontSize: 12, fontWeight: 500, margin: 0,  },
    messageSlice: {fontSize: 13,marginRight: 5, maxWidth: messageSliceSpace},
    messageDate: {fontSize: 13},    
    messageNoHead: {width: widthWithNoHead, paddingRight: 10},
    messageChevron: {marginLeft: 15},


})


