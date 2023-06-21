import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../firebase/firebase";
import { getAllPosts } from "../redux/slices/postslice";



export const getPosts = async() =>{
    let postList = new Set()
    const dispatch = useDispatch()
    const querySnapshot = await getDocs(collection(db, "articles"));
    querySnapshot.forEach((doc) => {
       // console.log('function run success');
        const {title , category , createDate , description , imgUrl , userId , username} = doc.data()
        const data = {
            title: title,
            category: category,
            createDate: createDate,
            description: description ,
            imgUrl: imgUrl ,
            postId: doc.id ,
            userId: userId ,
            username: username
        }
        postList.add(data)
    });
    
    const sortingArr = Array.from(postList).sort(function(a, b){return a.createDate.seconds - b.createDate.seconds})
    const sortedList = new Set(sortingArr)
   // console.log(sortedList)
    dispatch(getAllPosts(sortedList))
}