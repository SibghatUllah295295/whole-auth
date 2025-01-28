'use client'
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import React from "react";
const Page = () => {
    const router = useRouter();
    const [error, setError] = React.useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('logout started');
        try {
            const res = await fetch('/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status == 200) {
                console.log('User Logged Out successfully');
                router.push('/');
                return;
            }
            if (res.status == 500) {
                console.log('User Logout process failed');
                setError('Failed to Logout');
            }
        } catch (error) {
            console.log('catched Error in Log out');
            console.log(error);
        }
    }
    return (
        <>
            
                <button onClick = {()=>signOut()}>LogOut</button>
            
            <p>{error}</p>
        </>
    )
}
export default Page;