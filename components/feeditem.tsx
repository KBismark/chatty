import { Text, useTheme } from "@/constants/Theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { memo, useMemo} from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusHead } from "./status";
import { GradientBackground } from "./commons/gradient";
import { generateGradientColors } from "@/utils/random-generators";
import { useUserStore } from "@/stores/users";



export const Item = memo(({propsSource:userId}: {propsSource: string})=>{
    const {colors} = useTheme();
    let {name, contact} = useUserStore({userId, watch: []})
    let nameUsed = name;

    [name, nameUsed] = useMemo(()=>{
        name = name||contact||'Unknown';
        nameUsed = name.trim().slice(0,20).trim();
        nameUsed = nameUsed.length>=20?`${nameUsed}...`:nameUsed;
        return [name, nameUsed]
    },[name])
    
    const {black, fadedBlack, divider, highlights} = colors;

    return (
        <View style={[ {borderBottomColor: divider, borderBottomWidth: 1,marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 20}]}>
            <View style={[styles.displayRow, {paddingBottom: 5}]}>
                <View style={[styles.displayRow, {justifyContent: 'flex-start'}]}>
                    <StatusHead propsSource={userId} size={40} />
                    <View style={[styles.displayRow, {marginLeft: 10}]}>
                        <Text style={ {fontWeight: '700', fontSize: 16, color: black} }>{nameUsed}</Text>
                        <Text style={{marginLeft: 5, fontSize: 13, fontWeight: '500'}}>2 hours</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name='chevron-down' size={24} color={fadedBlack} />
                </TouchableOpacity>
            </View>
            <GradientBackground colors={generateGradientColors()} style={{height: 250, margin: 5, borderRadius: 20, marginBottom: 5}}>
                {/* Post space */}
            </GradientBackground>
            <View style={[styles.displayRow, { marginVertical: 10, marginLeft: 10}]}>
                
                <View style={[styles.displayRow]}>
                    <TouchableOpacity style={[styles.displayRow, styles.reactionIcons, {backgroundColor: highlights, borderColor: divider, marginLeft: 0}]}>
                        <Feather name='bookmark' size={22} color={colors.primary} />
                    </TouchableOpacity>
                    <View style={styles.displayRow}>
                        <TouchableOpacity style={[styles.displayRow, styles.reactionIcons, {backgroundColor: highlights, borderColor: divider}]}>
                            <MaterialCommunityIcons name='heart-outline' size={22} color={colors.danger} />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 5, fontSize: 13, fontWeight: '500'}}> 2k+ </Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.displayRow, styles.reactionIcons, {backgroundColor: highlights, borderColor: divider}]}>
                    <Feather name='more-horizontal' size={22} color={fadedBlack} />
                </TouchableOpacity>
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

