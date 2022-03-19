import { collection,doc, updateDoc,getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export const login=(userCredential:any):Promise<any>=>{
    const {email,password}=userCredential
    const auth = getAuth();
    return new Promise((res,err)=>{
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const accessToken=await userCredential.user.getIdToken()
          localStorage.setItem('access-token',accessToken)
          res(user.uid)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          err({errorCode,errorMessage})
        });
    })
}


