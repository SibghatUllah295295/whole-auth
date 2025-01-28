'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
const Page = () =>{
  const {data} = useSession();
  const [token, setToken] = React.useState({});
  
  const getToken = async () =>{
    const res = await fetch('/api/getcookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if(res.status == 200){
      const data = await res.json();
      setToken(data);
      console.log("Token in Status::200  : ", data.email);
      return;
    }
    if(res.status == 500){
      console.log(res.json());
      return;
    }
    if(res.status == 400){
      console.log(res.json());
      return;
    }
  }
React.useEffect(()=>{
  getToken();
},[])
  if(!token){
    console.log("Token is Undefined");
  }
  else{
    console.log("Token: ",token);
  }
    
const saveSession =async ()=>{
  try{
    const res = await fetch('/api/landPage',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
    })
    if(res.status == 201){
      console.log(res.json());
      return;
    }
    if(res.status == 401){
      console.log(res.json());
      return;
    }
    if(res.status == 500){
      console.log(res.json());
      return;
    }
  }catch(error){
    console.log('Error at fetching API at home page: ',error);
    return;
  }
  
}
console.log(data);
if(data){
  saveSession()
}

  return(
    <>
        <Navbar />
<h1>Landing Page</h1>
    </>
  )
}
export default Page;