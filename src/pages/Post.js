import db from "../firebase/firebaseConfig"
const userInfo = db.collection('userInfo');

export async function addDataToFirestore(name, selectEntry, terms, uuid) {
  try {
    const info = {
      name: name,
      selected: selectEntry,
      terms: terms,
      uuid: uuid,
    };

    // Use the collection reference to query the document with the given uuid
    const querySnapshot = await db.collection('userInfo').where('uuid', '==', uuid).get();

    // Check if the document with the given uuid exists
    if (!querySnapshot.empty) {
      // The document with the uuid exists, so update it with the new data
      const docRef = querySnapshot.docs[0].ref;
      await docRef.update(info);
    } else {
      // The document with the given uuid doesn't exist, create a new one
      await db.collection('userInfo').doc(uuid).set(info);
    }

    // Fetch the updated/created document using the uuid
    const updatedDocSnapshot = await db.collection('userInfo').doc(uuid).get();

    if (updatedDocSnapshot.exists) {
      const data = updatedDocSnapshot.data();
      return data;
    } else {
      console.log('Document not found.');
    }
  } catch (error) {
    console.error('Error adding or getting document:', error);
  }
}
