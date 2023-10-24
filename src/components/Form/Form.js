import { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Keyboard, Alert } from 'react-native';
import styles from './styles';

export default function Form(props) {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDone, setTaskDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddPress = () => {
    if (taskDescription) {
      props.onAddTask(taskDescription, taskDone);
      setErrorMessage(null);
      setTaskDescription('');
      setTaskDone(false);
      Keyboard.dismiss();
      handleAddTaskPress(); // Show the alert
    } else {
      setErrorMessage('The description is required.');
    }
  }

  const handleDescriptionChange = (value) => {
    setTaskDescription(value);
  }

  const handleStatusChange = (value) => {
    setTaskDone(value);
  }

  const handleAddTaskPress = () => {
    Alert.alert(
      'Task Added',
      'Task Added Successfully',
      [{ text: 'OK' }]
    );
  }

  return (
    <View style={styles.container}>
      {errorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageText}>Attention: {errorMessage}</Text>
        </View>
      )}
      <TextInput
        style={styles.descriptionContainer}
        placeholder='Enter a task description'
        maxLength={150}
        onChangeText={handleDescriptionChange}
        defaultValue={taskDescription}
      />
      <View>
        <Text>Completed:</Text>
        <Switch
          value={taskDone}
          onValueChange={handleStatusChange}
        />
      </View>
      <Button
        title='Add Task'
        onPress={handleAddPress}
      />
    </View>
  );
}
