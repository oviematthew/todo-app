import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Pressable, Modal, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { dbCollection } from '../../../database/config';
import styles from '../styles';

export default function Task(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskStatus, setTaskStatus] = useState(props.task.done);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  }

  const handleToggleStatus =  () => {
    try {
      const updatedStatus = !taskStatus;
      setTaskStatus(updatedStatus);
  
      // Update the task status in the Firestore database
      const taskRef = doc(dbCollection, props.task.id);
  
     updateDoc(taskRef, { 
        done: updatedStatus 
      });
  
      // Trigger the parent component to update its state
      props.onStatusChange(props.task.id);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  

  const handleRemovePress = () => {
    Alert.alert(
      'Remove Task',
      'This action will permanently delete this task. This action cannot be undone!',
      [
        {
          text: 'Confirm',
          onPress: async () => {
            await props.onTaskRemoval(props.task.id);
            setShowModal(false);
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  }

  // useEffect to update the toggle status when the component mounts
  useEffect(() => {
    setTaskStatus(props.task.done);
  }, [props.task.done]);

  return (
    <>
      <Pressable onPress={handleRemovePress}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.task.description}</Text>
          <Text style={styles.text}>Id: {props.task.id}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>Status: {taskStatus ? 'Completed' : 'Open'}</Text>
            <Switch
              style={{ transform: [{ scale: 0.5 }] }}
              value={taskStatus}
              onValueChange={handleToggleStatus}
            />
          </View>
        </View>
      </Pressable>

      <Modal visible={showModal}>
        <View>
          <Text style={styles.title}>{props.task.description}</Text>
          <Pressable onPress={handleModalToggle}>
            <Text>X Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
