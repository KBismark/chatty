import { FlatList } from "react-native-gesture-handler"
import { Item } from "./feeditem"
import { useMainAccountStore } from "@/stores";
import { View } from "react-native";
import { memo } from "react";

export const ForYouScreen = memo(()=>{
    const {contactList} = useMainAccountStore({watch: ['contactList']})!;
    return (
        <FlatList 
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={contactList.slice(0, 14)}
            renderItem={({item:userId, index})=>{
                return <Item propsSource={userId} />
            }}
            keyExtractor={(item,index)=>item}
            ListFooterComponent={<View style={{paddingBottom: '45%'}} />}
        />
    )
})

