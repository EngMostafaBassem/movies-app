import {db} from '../../../firebase-config'
import { collection, query, where, getDocs, getDoc, limit } from "firebase/firestore";
export const fetchCurrentUser=async(id:string)=>{
    const q = query(collection(db, "users"), where("id", "==", id),limit(1));
    const usersDoc:any=[]
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const {name,email}=doc.data()
        usersDoc.push({id:doc.id,name,email})
      })
     return usersDoc[0]   
}
