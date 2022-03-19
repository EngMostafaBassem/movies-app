import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../../../firebase-config'
export const register=(credentials:any)=>{
    const user:any={}
    const {name,email,password}=credentials
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
    // Signed in 
       const response = userCredential.user;
       user.id=response.uid
       await addDoc(collection(db, "users"),{
        id:response.uid,
        name,
        email,
        ...response.metadata
       });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return user
}