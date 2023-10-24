import { View, ScrollView } from 'react-native';
import Task from './Task/Task';
import styles from './styles';
export default function Tasks(props) {

 
    
return (

<ScrollView>
<View style={styles.container}>
{props.tasks.map(
(task, index) => (
<Task key={index} task={task} 
onStatusChange={props.onStatusChange}
onTaskRemoval={props.onTaskRemoval}/>
)
)}

</View>
</ScrollView>
);
}