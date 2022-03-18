import {db} from '../../../firebase-config'
import { collection,getDocs,query } from "firebase/firestore";

export const fetchGenres=async()=>{
    const q = query(collection(db, "genres"))
    const genres:any=[]
    const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
        genres.push({_id:doc.id,...doc.data()})      
     });
    return genres

}