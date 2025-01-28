'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
const Page = () => {
    const router = useRouter();
    const [token,setToken] = React.useState({});
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
          console.log("Token in Status::200  : ", data);
          console.log("IsAdmin", data.isAdmin?'true':'false');
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
      }, []);
      console.log('Token:', token);
        
        return(
            <div>
                {
                token.isAdmin? 
                <div>
                    <h2>Welcome {token.name}!</h2>
                    <p>Your Eamil is: {token.email}</p>
                    <p>Is admin: {token.isAdmin?'true':'false'}</p>
                </div>
                :
                <h3>Loading...</h3>
                
            }

            
            </div>
            
        )
    
    
}
export default Page;