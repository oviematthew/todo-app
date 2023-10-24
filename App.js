import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text } from 'react-native';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import { FontAwesome5 } from '@expo/vector-icons';
import Form from './src/components/Form/Form';
import styles from './src/styles/main';
import uuid from 'react-uuid';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();



export default function App() {
  const [tasks, setTasks] = useState(
    [
      {
        id: uuid(),
        description: "Walk the dog",
        done: true
      },
      {
        id: uuid(),
        description: "Wash the car",
        done: false
      },
      {
        id: uuid(),
        description: "Finish the lab",
        done: true
      },
    ]
  );

  const handleAddTask = (taskDescription, taskDone) => {
    const updatedTasks = [...tasks];
    updatedTasks.push(
      {
        id: uuid(),
        description: taskDescription,
        done: taskDone
      }
    );
    setTasks(updatedTasks);
  }


  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  const handleTaskRemoval = (id) => {
    const updatedTasks = tasks.filter((task) =>
      task.id !== id
    );
    setTasks(updatedTasks);
  }

  //List Page
  function List() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Header />

          <Tasks tasks={tasks}
            onStatusChange={handleStatusChange}
            onTaskRemoval={handleTaskRemoval} />

        </View>
      </ScrollView>
    )
  }


  //Add new tasks page
  function Add() {
    return (
      <View>
        <StatusBar style="auto" />
        <Form onAddTask={handleAddTask} />
      </View>
    )
  }



  //Rendered screen
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