import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { load } from './src/database/config';
import Form from './src/components/Form/Form';
import LocalNotification from './src/components/LocalNotification';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import { FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import uuid from 'react-uuid';
import { dbCollection } from './src/database/config';
import { deleteDoc, doc, updateDoc} from 'firebase/firestore';
import * as Notifications from 'expo-notifications';

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load tasks when the component mounts
    load()
      .then((loadedTasks) => {
        setTasks(loadedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading tasks:', error);
        setLoading(false);
      });
  }, []);

  const handleAddTask = (taskId, taskDescription, taskDone) => {
    const updatedTasks = [...tasks, { 
      id: taskId, 
      description: taskDescription, 
      done: taskDone 
    }];
    setTasks(updatedTasks);
  };

  const handleStatusChange = (id) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;
  
      // Update the task in the database
      const taskRef = doc(dbCollection, id);
      updateDoc(taskRef, { 
        done: updatedTasks[taskIndex].done 
      });
  
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error changing task status:', error);
    }
  };
  

  const handleTaskRemoval = (id) => {
    try {
      // Remove the task from the database
      deleteDoc(doc(dbCollection, id));
  
      // Update the state by filtering out the removed task
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  }
  

  // List Page
  function List() {
    return (
      <ScrollView>
        <View>
          <StatusBar style="auto" />
          <Header />

          {!loading && tasks.length === 0 && 
          <Text style={{ textAlign: 'center' }}>There are no tasks in the list</Text>
          }

          {!loading && tasks.length > 0 && (
            <Tasks tasks={tasks} onStatusChange={handleStatusChange} onTaskRemoval={handleTaskRemoval} />
          )}
        </View>
      </ScrollView>
    );
  }

  // Add new tasks page
  function Add() {
    return (
      <View>
        <StatusBar style="auto" />
        <Form onAddTask={handleAddTask} />
      </View>
    );
  }

   // Add settings page
   function Settings() {
    return (
      <View>
        <StatusBar style="auto" />
        <LocalNotification/>
      </View>
    );
  }

  // Rendered screen
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="List"
          component={List}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="tasks" size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarIcon: ({ color }) => (
              <View>
                <MaterialIcons name="add-circle-outline" size={24} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="gears" size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
