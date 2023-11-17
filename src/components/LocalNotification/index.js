import { View, Text, Switch, Platform, Pressable } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import * as Notifications from 'expo-notifications';

export default function LocalNotification(){
    const [reminder, setReminder] = useState(false);

    const handleReminderPress = () => {
        if(!reminder) {
            scheduleReminder()
            setReminder(true);
        }
        else{
            cancelReminder()
            setReminder(false);
        }
    }
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Notifications:</Text>
            <Text style = {styles.description}>
                Remind me to keep my tasks up to date.
            </Text>

            {/* Switch option */}
            <View style = {styles.options.container}>
                <Switch
                value = {reminder}
                onValueChange = {handleReminderPress}
                />
                <Pressable onPress={handleReminderPress}>
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

async function scheduleReminder() {
    console.log('Schedule for', Platform.OS);

    //Check for permission
    const permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
        const request = await Notifications.requestPermissionsAsync({
            ios: {
                allowAlert: true,
                allowSound: true,
                allowBadge: true
            }
        });

        if(!request.granted){
            return false;
        }
    }


    //schedule a notification
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Post Reminder',
            body: 'Have you added tasks today?',
        },
        trigger: {
            seconds: 5
        }
    });
    console.log('id: ', id)


    //pernission granted
    return true;
}

function cancelReminder() {
    console.log('Cancel for', Platform.OS);
}