import {db} from '../../../firebase-config'
import { doc, deleteDoc } from "firebase/firestore";
export const deleteMovie=async(id:string)=>{
    await deleteDoc(doc(db, "movies", id));
}