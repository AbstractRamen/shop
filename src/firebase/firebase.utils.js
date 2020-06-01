import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'


const config =  {
    apiKey: "AIzaSyATCwaokbqrTAGvbO6OVsMOkL8SXlIrjsg",
    authDomain: "shop-trial.firebaseapp.com",
    databaseURL: "https://shop-trial.firebaseio.com",
    projectId: "shop-trial",
    storageBucket: "shop-trial.appspot.com",
    messagingSenderId: "295846462602",
    appId: "1:295846462602:web:aacadcac4322f2a82c1973",
    measurementId: "G-Z19J771LWZ"
  };

export const createUserProfileDocument = async ( userAuth, additionalData ) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err){
      console.log('error creating user', err.message)
    }
  }


  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
