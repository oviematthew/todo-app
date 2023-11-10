import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { load } from './src/database/read';
import Form from './src/components/Form/Form';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import { FontAwesome5 } from '@expo/vector-icons';
import uuid from 'react-uuid';
import { db } from './src/database/config';
import { deleteDoc, doc } from 'firebase/firestore';

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

  const handleAddTask = async (taskId, taskDescription, taskDone) => {
    const updatedTasks = [...tasks, { id: taskId, description: taskDescription, done: taskDone }];
    setTasks(updatedTasks);
  }

  const handleStatusChange = async (id) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;

      // Update the task in the database
      // You'll need to implement the update function in write.js

      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error changing task status:', error);
    }
  }

  const handleTaskRemoval = async (id) => {
    try {
      // Remove the task from the database
      await deleteDoc(doc(db, 'tasks', id));

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
          {loading && <Text>Loading...</Text>}
          {!loading && tasks.length === 0 && <Text>No tasks in the list</Text>}
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
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5 name="bars" size={20} style={{ marginRight: 2 }} />
                <FontAwesome5 name="plus" size={20} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
