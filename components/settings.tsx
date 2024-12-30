
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Switch, Text, } from "@rneui/base";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Linking from 'expo-linking'
import { router } from "expo-router";
import { setThemeMode, useTheme } from "@/theme/Theme";
import { StatusHead } from "./status";
import { GradientBackground } from "./commons/gradient";
import { isAndroid } from "@/constants/Screen";

const HELP_PHONE = '+233570891131'
const HELP_EMAIL = 'bismarkkwabenayamoah@gmail.com'

const ProfileSettings = ()=>{
    const {mode, colors} = useTheme();
    const {white, black, divider, fadedBlack , gray1} = colors;
    const { grey4, grey3} = { grey4: gray1, grey3: fadedBlack}
    
    const slideStyle = {paddingHorizontal: 10, paddingVertical: 12, borderBottomColor: divider, borderBottomWidth: 1, };

    return (
        <View style={[styles.container, {backgroundColor: white, }]}>
            <ScrollView contentContainerStyle={{marginHorizontal: 15,paddingBottom: '15%'}}>
                <View style={[styles.row, {marginVertical: 20,}]}>
                    <Pressable style={{marginRight: 10, width: 70, height: 70, borderRadius: 70, backgroundColor: grey4, overflow: 'hidden' }}>
                        
                        <View style={{
                            position: 'absolute', bottom: 0, right: 0, top: 0, left: 0,
                            padding: 3, alignItems: 'center',
                            justifyContent: 'center', 
                        }}>
                            <Feather name='camera' size={28} color={fadedBlack} />
                        </View>
                        <StatusHead isMainUser={true} stripMargin={true} size={70} propsSource={''} />
                    </Pressable>
                    <View>
                        <Text style={{fontWeight: 700, fontSize: 22, color: black}}>
                            Jessica Bruce
                        </Text>
                        <Text style={{fontSize: 16, color: fadedBlack}}>
                            (+233) 594 391 706
                        </Text>
                    </View>
                </View>
                <View style={{marginBottom: 40}}>
                    <View style={{
                        ...(isAndroid?{
                            shadowColor: black,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.17,
                        }:{
                            borderTopColor: divider,
                            borderTopWidth: 1,
                        }),
                        backgroundColor: white,
                        borderRadius: 5,
                    }}>
                        
                        <Pressable style={[styles.rowbt, slideStyle]}>
                            <View style={styles.row}>
                                <MaterialCommunityIcons name='account' size={22} color={'#ffffff'} style={[styles.icon, {backgroundColor: colors.secondary, padding: 2}]} />
                                <Text style={{color: black, marginLeft: 10, fontSize: 17,}}>
                                    Manage accounts
                                </Text>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                        <Pressable style={[styles.rowbt, slideStyle]}>
                            <View style={styles.row}>
                                <MaterialIcons name='history-toggle-off'  size={21} color={'#ffffff'} style={[styles.icon, {backgroundColor: 'rgb(190, 72, 220)'}]} />
                                <Text style={{color: black, marginLeft: 10, fontSize: 17,}}>
                                    Story privacy
                                </Text>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                        <Pressable style={[styles.rowbt, slideStyle]}>
                            <View style={styles.row}>
                                <MaterialCommunityIcons name='lock' size={21} color={'#ffffff'} style={[styles.icon, {backgroundColor: 'rgb(195, 103, 60)'}]} />
                                <Text style={{color: black, marginLeft: 10, fontSize: 17,}}>
                                    Blocked accounts
                                </Text>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                        <Pressable style={[styles.rowbt, slideStyle, {borderBottomColor: 'rgba(0,0,0,0)'}]}>
                            <View style={styles.row}>
                                <GradientBackground style={styles.icon}>
                                    <MaterialCommunityIcons name='brightness-4' size={21} color={'#ffffff'} style={{padding: 1}} />
                                </GradientBackground>
                                <Text style={{color: black, marginLeft: 10, fontSize: 17,}}>
                                    Dark mode
                                </Text>
                            </View>
                            <ThemeUpdater />
                        </Pressable>
                    </View>
                </View>
                <View style={{marginBottom: 40}}>
                    <View style={{
                        ...(isAndroid?{
                            shadowColor: black,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.17,
                        }:{
                            borderTopColor: divider,
                            borderTopWidth: 1,
                        }),
                        backgroundColor: white,
                        borderRadius: 5,
                    }}>
                        
                        
                        <Pressable style={[styles.rowbt, slideStyle]}>
                            <View style={styles.row}>
                                <MaterialCommunityIcons name='heart-cog' size={21} color={'#ffffff'} style={[styles.icon, {backgroundColor: 'rgb(227, 37, 106)'}]} />
                                <Text style={{color: black, marginLeft: 10, fontSize: 17,}}>
                                    Interests
                                </Text>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                        <Pressable style={[styles.rowbt, slideStyle, {borderBottomColor: 'rgba(0,0,0,0)'}]}>
                            <View style={styles.row}>
                                <MaterialIcons name='bookmark-add' size={22} color={'#ffffff'} style={[styles.icon, {backgroundColor: colors.primary, padding: 2}]} />
                                <Text style={{color: black, marginLeft: 10, fontSize: 17,}}>
                                    Bookmarked
                                </Text>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                    </View>
                </View>
                <View style={{marginBottom: 40}}>
                    <View style={{
                        paddingBottom: 5,
                    }}>
                        <Text style={{fontSize: 16, color: grey3,}}>
                            Contact details
                        </Text>
                    </View>
                    <View style={{
                        ...(isAndroid?{
                            shadowColor: black,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.17,
                        }:{
                            borderTopColor: divider,
                            borderTopWidth: 1,
                        }),
                        backgroundColor: white,
                        borderRadius: 5,
                    }}>
                        
                        <Pressable 
                            onPress={()=>{
                                router.push('/profile/contacts/phone' as any)
                            }}
                            style={[styles.rowbt, slideStyle]}
                        >
                            <View style={styles.row}>
                                <MaterialCommunityIcons name='phone'  size={21} color={'#ffffff'} style={[styles.icon, {backgroundColor: colors.secondary, paddingTop: 3.5}]} />
                               <View style={{marginLeft: 10,}}>
                                    <Text style={{color: black, fontSize: 17,}}>
                                        Phone number
                                    </Text>
                                    <Text style={{color: fadedBlack, fontSize: 11,}}>
                                        Verify your phone number
                                    </Text>
                               </View>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                        <Pressable style={[styles.rowbt, slideStyle, {borderBottomColor: 'rgba(0,0,0,0)'}]}>
                            <View style={styles.row}>
                                <MaterialIcons name='mail'  size={21} color={'#ffffff'} style={[styles.icon, {backgroundColor: 'rgb(195, 60, 92)'}]} />
                                <View style={{marginLeft: 10,}}>
                                    <Text style={{color: black, fontSize: 17,}}>
                                        Email address
                                    </Text>
                                    <Text style={{color: fadedBlack, fontSize: 11,}}>
                                        Add your email address
                                    </Text>
                               </View>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                    </View>
                </View>
                <View style={{marginBottom: 40}}>
                    <View style={{
                        paddingBottom: 5,
                    }}>
                        <Text style={{fontSize: 16, color: grey3,}}>
                            Help desk
                        </Text>
                    </View>
                    <View style={{
                        ...(isAndroid?{
                            shadowColor: black,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.17,
                        }:{
                            borderTopColor: divider,
                            borderTopWidth: 1,
                        }),
                        backgroundColor: white,
                        borderRadius: 5,
                    }}>
                        
                        <Pressable onPress={()=>{
                            Linking.canOpenURL(`tel:${HELP_PHONE}`).
                            then((proceed)=>{
                                if(proceed){
                                    return Linking.openURL(`tel:${HELP_PHONE}`)
                                }
                            })
                        }} style={[styles.rowbt, slideStyle]}>
                            <View style={styles.row}>
                                
                                <GradientBackground style={styles.icon}>
                                    <MaterialCommunityIcons name='phone'  size={21} color={'#ffffff'} style={{ paddingTop: 1.5}} />
                                </GradientBackground>
                               <View style={{marginLeft: 10,}}>
                                    <Text style={{color: black, fontSize: 17,}}>
                                        Via phone call
                                    </Text>
                                    <Text style={{color: fadedBlack, fontSize: 11,}}>
                                        Talk to a personnel
                                    </Text>
                               </View>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                        <Pressable 
                            onPress={()=>{
                                Linking.canOpenURL(`mailto:${HELP_EMAIL}`).
                                then((proceed)=>{
                                    if(proceed){
                                        return Linking.openURL(`mailto:${HELP_EMAIL}`)
                                    }
                                })
                            }}
                            style={[styles.rowbt, slideStyle, {borderBottomColor: 'rgba(0,0,0,0)'}]}
                        >
                            <View style={styles.row}>
                                
                                <GradientBackground style={styles.icon}>
                                    <MaterialIcons name='mail'  size={22} color={'#ffffff'} />
                                </GradientBackground>
                                <View style={{marginLeft: 10,}}>
                                    <Text style={{color: black, fontSize: 17,}}>
                                        Via email message
                                    </Text>
                                    <Text style={{color: fadedBlack, fontSize: 11,}}>
                                        Send us a message via email
                                    </Text>
                               </View>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                        
                    </View>
                </View>
                <View style={{marginBottom: 40}}>
                    <View style={{
                        paddingBottom: 5,
                    }}>
                        <Text style={{fontSize: 16, color: grey3,}}>
                            Terms and conditions
                        </Text>
                    </View>
                    <View style={{
                        ...(isAndroid?{
                            shadowColor: black,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.17,
                        }:{
                            borderTopColor: divider,
                            borderTopWidth: 1,
                        }),
                        backgroundColor: white,
                        borderRadius: 5,
                    }}>
                        <Pressable style={[styles.rowbt, slideStyle, {borderBottomColor: 'rgba(0,0,0,0)'}]}>
                            <View style={styles.row}>
                                <MaterialIcons name='library-books'  size={21} color={'#ffffff'} style={[styles.icon, {backgroundColor: 'rgb(60, 195, 116)'}]} />
                                <Text style={{color: black, marginLeft: 10, fontSize: 17,}}>
                                    Terms and condtions
                                </Text>
                            </View>
                            <Feather name='chevron-right' size={20} color={fadedBlack} />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileSettings;

const ThemeUpdater = ()=>{
    const {mode,colors} = useTheme();
    const darkMode = mode === 'dark';
    return <Switch color={colors.primary} value={darkMode} onValueChange={()=> setThemeMode(darkMode?'light':'dark')} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    contentContainer:{
        flex: 1,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {flexDirection: 'row', alignItems: 'center'},
    rowbt: {flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'},

    icon: {padding: 3, borderRadius: 5,}
})

