
'use client'
import axios from "axios"
import Link from "next/link"
import { useState ,useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import { useUser } from '@auth0/nextjs-auth0/client';

import { useRouter } from 'next/navigation';
export default  function dashboard(){
  const router = useRouter();
  const { user, error, isLoading } = useUser();

    const [data1,setData1] = useState([])
     
        async function callFiles(){
            const {data} = await axios.get(`http://localhost:8000/getCode/?email=${user?.name}`) 
        setData1(data.files)
        }
        
        useEffect(()=>{
            callFiles()
        },[])
    
    

    
        
    
        if(!user){
          router.push("/")
        }
    
else{


    return(
        <div>
            <h1 className="text-center text-3xl font-thin  mt-5 bg-base-100">Dashboard</h1>
            <div className="bg-base-100">
            <Link href="/profile"><button className="btn btn-active btn-primary ml-7 mb-3 mt-5"><FaPlus/> Create</button></Link>
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 bg-base-100 ">
                
      {data1.map((data1, index) => (
        <div key={index} className="card bg-base-300 shadow-xl">
          <div className="card-body items-center text-center">
            
            
            <Link href={`profile/${data1}`}><button className="card-title text-lg ">{data1}</button></Link>
            
          </div>
        </div>
      ))}
    </div>

        </div>
        
    )
  }
}