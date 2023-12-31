import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
container: {
alignSelf: 'stretch',
backgroundColor: '#fff',
margin: 10,
padding: 20,
borderRadius: 7,
borderWidth: 1,
borderColor: '#bcbcbc'
},
title: {
    fontSize: 20,
    fontWeight: 'bold'
},
description: {
    fontSize: 17,
    color: '#777777',
    marginBottom: 10
},

options: {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    label: {
        marginLeft: 10,
        fontSize: 17
    }
},


});
export default styles;