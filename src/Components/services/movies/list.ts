import {db} from '../../../firebase-config'
import { collection,getDocs,query } from "firebase/firestore";


export const fetchMovies=async()=>{
    const q = query(collection(db, "movies"))
    const movies:any=[]
    const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
       movies.push({_id:doc.id,...doc.data()})      
     });
    return movies

}