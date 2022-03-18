import {db} from '../../../firebase-config'
import { doc, getDoc } from "firebase/firestore";

export const fetchMovie=async (id:string)=>{
    let movie:any={}
    const docRef = doc(db, "movies",id );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        movie=docSnap.data()
     
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return movie
}
