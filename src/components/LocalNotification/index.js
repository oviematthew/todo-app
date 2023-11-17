import { View, Text, Switch, Platform, Pressable } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";

export default function LocalNotification(){
    const [reminder, setReminder] = useState(false);
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Notifications:</Text>
            <Text style = {styles.description}>
                Remind me to keep my tasks up to date.
            </Text>

            {/* Switch option */}
            <View style = {styles.options.container}>
                <Switch/>
                <Pressable>
                    <Text style = {styles.options.label}>
                        Set Daily Reminder
                    </Text>
                </Pressable>
            </View>

            {/* logs */}
            <View style = {styles.logs.container}>
                
                    <Text style= {styles.logs.title}>
                        Scheduled Notifications: 0
                    </Text>
                    <Text style= {styles.logs.text}>
                        None
                    </Text>
            </View>
        </View>
    )
}