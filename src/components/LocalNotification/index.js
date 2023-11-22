import { View, Text, Switch, Platform, Pressable } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import * as Notifications from 'expo-notifications';

export default function LocalNotification(){
    const [reminder, setReminder] = useState(false);
    const [schedule, setSchedule] = useState([])

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

    //load scheduled remminders.
    useEffect(()=> {
        (async () =>{
            const previousSchedule = await getSchedule();
            setSchedule(previousSchedule)
        })
    })

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

            
        </View>
    )
}

async function scheduleReminder() {
    console.log('Schedule for', Platform.OS);

    try{
        
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
            sound: true,
            subtitle: "Do not forget",
        },
        trigger: {
            seconds: 5,
            repeats: true,
        }
    });
    console.log('Schedule Id: ', id)
    
    return true;
    }
    catch {
    return false;
    }
}

function cancelReminder() {
    console.log('Cancel for', Platform.OS);

    Notifications.getAllScheduledNotificationsAsync()
    .then((notifications) => {
    notifications.forEach((notification) => {
    Notifications.cancelScheduledNotificationAsync(notification.identifier);
    });
    });
}

async function getSchedule(){
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync;
    
    //create an array of schedule
    const schedule = [];

    scheduledNotifications.forEach((scheduledNotification) =>{
        schedule.push({
            id: scheduledNotification.identifier,
            type: scheduledNotification.content.data.type
        });
    });
    return schedule
}