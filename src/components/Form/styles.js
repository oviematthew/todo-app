import { Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
container: {
alignSelf: 'stretch',
justifyContent: 'center',
alignItems: 'center',
gap: 10,
backgroundColor: 'orange',
padding: 20
},
errorMessageContainer: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  errorMessageText: {
    color: 'red',
  },

  descriptionContainer: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 10
    
  }
});

export default styles;