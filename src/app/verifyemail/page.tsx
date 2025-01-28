'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');
    useEffect(()=>{
        const hashedToken = window.location.search.split('=')[1];
        setToken(hashedToken);
        console.log(token);
    },[])
    const fetchData =async ()=>{
        try {
         
        const res = await fetch('/api/verifyemail',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({token})
            })
            if(res.status == 401){
                setError('Token Expired');
                return;
            }
            if(res.status == 500){
                setError('Internal Server Error');
                return;
            }
            if(res.status == 200){
                setError('');
                setVerified(true);
                router.push('/login');
                return
            }
            console.log(verified);
        } catch (error) {
            console.log('error',error);
        }
        
    }
    
    return(
        <>
        <button onClick = {fetchData}>Login</button>
        <p>{error}</p>
        </>
    )
}
export default Page;