import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "./comment-section";

export async function createOrUpdateProfile(usr) {
  if (usr) {
    const usrRef = doc(db, "userProfiles", usr.uid);
    const docSnap = await getDoc(usrRef);
    const existingDoc = docSnap.data();
    if (
      !docSnap.exists() ||
      existingDoc.displayName !== usr.displayName ||
      existingDoc.photoURL !== usr.photoURL
    )
      await setDoc(doc(db, "userProfiles", usr.uid), {
        displayName: usr.displayName,
        photoURL: usr.photoURL,
        uid: usr.uid,
      });
  }
}
