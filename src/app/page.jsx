"use client";
import React,{useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import getDoument from "@/firebase/firestore/getData";
import { collection,getDoc, doc, setDoc } from "firebase/firestore"; 
import firebase_app from "@/firebase/config";
import { getFirestore } from "firebase/firestore";
import { jwtDecode } from "jwt-decode";
import {  getAuth } from "firebase/auth";

function Page() {
const auth = getAuth(firebase_app);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const [toAdd,setToAdd] = useState('')
  const [userId,setUserId] = useState('')
  const [todoArray,setTodoArray] = useState([])
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    // if (!auth.currentUser) router.push("/signin")
    if (token == null) router.push("/signin")
    else{
      const decoded_token = jwtDecode(token)
      setUserId(decoded_token.user_id);
      }

  }, []);

  async function getData(){
    if(userId.length!=0){

      const {result,error} = await getDoument('todos',`${userId}`);
      if(result.data() && result.data().tasks){
        setTodoArray(result.data().tasks);
      }
      console.log(result.data());
      setLoading(false)
    }
  }

  useEffect(()=>{
     getData()
  },[userId])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    var arrayTemp = todoArray;
    arrayTemp.push({name:toAdd})
    const {result,error} = await addData('todos',`${userId}`,{tasks:arrayTemp});
    if(error){
      return
    }
    setTodoArray([...arrayTemp])
    console.log(todoArray);
    setLoading(false) 
  }


  const logOut =()=>{
    localStorage.removeItem("token");
    router.push('/signin')
  }

  const deleteArray = async (index)=>{
    setLoading(true)
    var arrayTemp = todoArray;
    arrayTemp.splice(index,1)
    const {result,error} = await addData('todos',`${userId}`,{tasks:arrayTemp});
    if(error){
      return
    }
    setTodoArray([...arrayTemp])
    console.log(todoArray);
    setLoading(false) 
  }

  return (
  <div className="container mx-auto w-full flex flex-col items-center justify-start mt-1">
    <div className="flex flex-col items-end justify-center px-2 w-full">
      <button className="bg-black text-white p-1 w-20" onClick={logOut}>Logout</button>
    </div>
    <form onSubmit={handleSubmit} className="mt-5">
      <input type="text" placeholder="Enter a new todo" className="border-2 border-black border-solid p-2" onChange={(e)=>setToAdd(e.target.value)} value={toAdd}/>
      <button type="submit" className="bg-black text-white p-3 w-24 mt-3">Add Todo</button>
    </form>
    <div className="mt-5">
      {loading ? 'loading please wait..' : (todoArray && todoArray.length!==0 ? todoArray.map((each,index)=>(
        <div key={index} className="border-2 border-solid border-black p-5 w-60 flex items-center justify-between">
          {each.name}
          <button className="bg-red text-white p-1 w-18" type="button" onClick={()=>deleteArray(index)}>Delete</button>
        </div>
      )) : 'No data to show')}
    </div>
  </div>
  );
}

export default Page;
