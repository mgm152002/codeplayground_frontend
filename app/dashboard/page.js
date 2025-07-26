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
            const {data} = await axios.get(`https://code-playground.duckdns.org/getCode/?email=${user?.name}`) 
        setData1(data.files)
        }
        
        useEffect(()=>{
            callFiles()
        },[])
    
    

    
        
    
        useEffect(() => {
          if (!user && process.env.SKIP_AUTH !== 'true') {
            router.push("/");
          }
        }, [user, router]);



    return(
        <div className="min-h-screen bg-background text-foreground p-6">
            <h1 className="text-center text-3xl font-bold mt-5 mb-8">Dashboard</h1>
            <div className="mb-6">
                <Link href="/profile">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        <FaPlus className="mr-2"/> Create
                    </button>
                </Link>
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data1.map((data1, index) => (
                    <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center text-center">
                        <Link href={`profile/${data1}`}>
                            <button className="text-xl font-semibold hover:underline">{data1}</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        
    )
  }
