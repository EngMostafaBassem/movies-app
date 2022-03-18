import {db} from '../../../firebase-config'
import { doc, updateDoc } from "firebase/firestore"; 
export const updateMovie=async(id:string,updatedMovie:any)=>{
    await updateDoc(doc(db, "movies",id),updatedMovie);
}