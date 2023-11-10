import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export function load() {
  const data = [];

  // Ensure that 'db' is an instance of Firestore
  const firestoreDb = getFirestore(db);
  const dbCollection = collection(firestoreDb, 'tasks');

  return new Promise((resolve, reject) => {
    getDocs(dbCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const task = {
            ...doc.data(),
            id: doc.id
          };
          data.push(task);
        });
        resolve(data);
      })
      .catch((error) => {
        console.log('Error:', error);
        reject(error);
      });
  });
}
