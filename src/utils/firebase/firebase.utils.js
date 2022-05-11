import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmKVuGBFjNfj-7noCdceLW6gr5iMJVyRg",
  authDomain: "crwn-clothing-db-48387.firebaseapp.com",
  projectId: "crwn-clothing-db-48387",
  storageBucket: "crwn-clothing-db-48387.appspot.com",
  messagingSenderId: "846896316276",
  appId: "1:846896316276:web:617ef0185479459dfab621",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
  }

  return userDocRef;
};
