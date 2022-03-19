import {db} from '../../../firebase-config'
import { collection, addDoc } from "firebase/firestore"; 
import { Movie } from '../../../types-dictionary/Movies';

export const addMovie= async(movie:Movie,userId:string)=>{
  // Add a new document with a generated id.
   await addDoc(collection(db, "movies"),{...movie,userId});
}