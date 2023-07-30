import db from "../firebase/firebaseConfig"
const userInfo = db.collection('userInfo');



export async function addDataToFirestore(name, selectEntry, terms,uuid) {
    try {
        const info = {
          name: name,
          selected: selectEntry,
          terms: terms,
          uuid:uuid
        };
    
        // Use the collection reference directly with add to create a new document
        const docRef = db.collection('userInfo').doc(uuid);
    
        // Use set with merge: true to update the document if it exists or create a new one if it doesn't
        await docRef.set({ info }, { merge: true });
    
        // Fetch the newly created/updated document using the docRef
        const doc = await docRef.get();
    
        if (doc.exists) {
          const data = doc.data();
          return data;
        } else {
          console.log('Document not found.');
        }
      } catch (error) {
        console.error('Error adding or getting document:', error);
      }
  }