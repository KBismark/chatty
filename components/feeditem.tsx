import { Text, useTheme } from "@/theme/Theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { memo, useCallback, useMemo, useState} from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusHead } from "./status";
import { GradientBackground } from "./commons/gradient";
import { generateGradientColors } from "@/utils/random-generators";
import { useUserStore } from "@/stores/users";



export const Item = memo(({propsSource:userId}: {propsSource: string})=>{
    const {colors} = useTheme();
    let {name, contact} = useUserStore({userId, watch: []})||{}
    let firstName = name;

    [name, firstName] = useMemo(()=>{
        name = (name||contact||'Unknown').trim();
        firstName = name.split(' ').shift() as string;
        firstName = firstName.length>=20?`${firstName.slice(0,17)}...`:firstName;
        return [name, firstName]
    },[name])
    
    const {black, fadedBlack, divider, highlights} = colors;

    return (
        <View style={[ {borderBottomColor: divider, borderBottomWidth: 1,marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 20}]}>
            <View style={[styles.displayRow, {paddingBottom: 5}]}>
                <View style={[styles.displayRow, {justifyContent: 'flex-start'}]}>
                    <StatusHead propsSource={userId} size={40} />
                    <View style={[styles.displayRow, {marginLeft: 10}]}>
                        <Text style={ {fontWeight: '700', fontSize: 16, color: black} }>{firstName}</Text>
                        <Text style={{marginLeft: 5, fontSize: 13, fontWeight: '500'}}>2 hours</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name='chevron-down' size={24} color={fadedBlack} />
                </TouchableOpacity>
            </View>
            <GradientBackground colors={generateGradientColors()} style={{...styles.displayRow, height: 250, margin: 5, borderRadius: 20, marginBottom: 5, justifyContent: 'center'}}>
                {
                    /* Post space */ 
                    <Text style={{color: '#ffffff', fontWeight: 700, paddingHorizontal: 25, textAlign:'center', fontSize: 25}}>Some cheerful message from {firstName}!</Text>
                }
            </GradientBackground>
            <View style={[styles.displayRow, { marginVertical: 10, marginLeft: 10}]}>
                <Reactions userId={userId} postId="" />
                <TouchableOpacity style={[styles.displayRow, styles.reactionIcons, {backgroundColor: highlights, borderColor: divider}]}>
                    <Feather name='more-horizontal' size={22} color={fadedBlack} />
                </TouchableOpacity>
            </View>
        </View>
    )
})


const Reactions = memo(({userId, postId}:{userId: string; postId: string})=>{
    const {colors} = useTheme()
    const [bookmarked, setBookmark] = useState(false)
    const [liked, setFavourite] = useState(false)

    const onBookmark = useCallback(()=>{
        setBookmark(!bookmarked)
    },[bookmarked])

    const onLike = useCallback(()=>{
        setFavourite(!liked)
    },[liked])

    return (
        <View style={[styles.displayRow]}>
            <TouchableOpacity onPress={onBookmark} style={[styles.displayRow, styles.reactionIcons, {backgroundColor: colors.highlights, borderColor: colors.divider, marginLeft: 0}]}>
                <MaterialCommunityIcons name={bookmarked?'bookmark':'bookmark-outline'} size={22} color={colors.primary} />
            </TouchableOpacity>
            <View style={styles.displayRow}>
                <TouchableOpacity onPress={onLike} style={[styles.displayRow, styles.reactionIcons, {backgroundColor: colors.highlights, borderColor: colors.divider}]}>
                    <MaterialCommunityIcons name={liked?'heart':'heart-outline'} size={22} color={colors.danger} />
                </TouchableOpacity>
                <Text style={{marginLeft: 5, fontSize: 13, fontWeight: '500'}}> 2k+ </Text>
            </View>
        </View>
    )
})


const styles = StyleSheet.create({
    displayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    reactionIcons: {justifyContent: 'center', padding: 7, marginLeft: 15, borderWidth: 1, borderRadius: 999}
});

