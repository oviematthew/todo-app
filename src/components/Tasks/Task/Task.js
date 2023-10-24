import { useState } from 'react';
import { View, Text, Switch, Pressable, Modal, Alert } from 'react-native'; 
import styles from '../styles';

export default function Task(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskStatus, setTaskStatus] = useState(props.task.done);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  }

  const handleStatusChangePress = () => {
    props.onStatusChange(props.task.id);
  }

  const handleToggleStatus = () => {
    const updatedStatus = !taskStatus;
    setTaskStatus(updatedStatus);
  }

  const handleRemovePress = () => {
    Alert.alert(
      'Remove Task',
      'This action will permanently delete this task. This action cannot be undone!',
      [ 
        {
          text: 'Confirm',
          onPress: () => {
            props.onTaskRemoval(props.task.id);
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

  return (
    <>
      <Pressable onPress={handleRemovePress}>

        <View style={styles.container}>
          <Text style={styles.title}>{props.task.description}</Text>
          <Text style={styles.text}>Id: {props.task.id}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>Status: {taskStatus ? 'Completed' : 'Open'}</Text>
            <Switch style={{ transform: [{ scale: 0.5 }] }}
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
