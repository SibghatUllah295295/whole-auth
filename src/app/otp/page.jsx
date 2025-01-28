'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import loginImage from '../../../public/assets/loginImage.svg';
import styles from './otp.module.css';
const page = () => {
    const [formData,setFormData] = React.useState({num1:'',num2:'',num3:'',num4:'',num5:'' });
    const [error, setError] = React.useState('');
    const [timer, setTimer] = React.useState(5);
    let [email,setEmail] = React.useState('');
    const router = useRouter();
    React.useEffect(()=>{
        setEmail(window.location.search.split('?')[1]);
    },[])
    let time;
    time = setTimeout(()=>{
        setTimer(timer-1);
    },1000)
    if(timer<1){
        clearTimeout(time);
    }
    const handleSubmit =async (e) => {
        e.preventDefault();
        const num1 = formData.num1;
        const num2 = formData.num2;
        const num3 = formData.num3;
        const num4 = formData.num4;
        const num5 = formData.num5;
        const number = num1.toString() + num2.toString() + num3.toString() + num4.toString() + num5.toString();
        console.log(number);
        try{
            const res =await fetch('/api/verifyemail',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({otp: number})
            })
            console.log('response:')
            
            if(res.status == 200){
                console.log('200 status started');
                setError('');
                router.push('/');
                return;
            }
            if(res.status == 401){
                setError('Otp code is expired, Register yourself again');
                return;
            }
            if(res.status == 500){
                setError('Otp code is incorrect');
                return;
            }
        }catch(error){
            console.log('Error Catched');
            console.log(error);
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleResend =async (e)=>{
        e.preventDefault();
        console.log('Resend OTP started');
        try{
            console.log('email',email);
            const res = await fetch('/api/resendotp',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            })
            if(res.status == 200){
                console.log('200 status started');
                setTimer(60);
                setError('');
                return;
            }
            if(res.status == 500){
                setError('Failed to Resend OTP');
                return;
            }
        }catch(error){
            console.log('Error Catched');
            console.log(error);
        }
    }
    return (
        <div className={styles.mainDiv}>
            <div className={styles.leftDiv}>
                <h1>Verification</h1>
                <h3>Enter OTP code</h3>
                <p>Enter the 5-digit code</p>
                <div className={styles.inputDiv}>
                        <input 
                        type="text" 
                        placeholder='1' 
                        maxLength='1' 
                        value = {formData.num1}
                        name='num1'
                        onChange = {handleChange}
                        />
                        <input type="text" 
                        placeholder='1' 
                        maxLength='1' 
                        value = {formData.num2}
                        name='num2'
                        onChange = {handleChange}/>
                        <input type="text" 
                        placeholder='1' 
                        maxLength='1' 
                        value = {formData.num3}
                        name='num3'
                        onChange = {handleChange}/>
                        <input type="text" 
                        placeholder='1' 
                        maxLength='1' 
                        value = {formData.num4}
                        name='num4'
                        onChange = {handleChange} />
                        <input type="text" 
                        placeholder='1' 
                        maxLength='1' 
                        value = {formData.num5}
                        name='num5'
                        onChange = {handleChange}/>
                    </div>
                    <div className = {styles.timer}>
                {timer>0?<p className={styles.resendTimer}>Resend:{timer}</p>
                :<button className={styles.resend} onClick={handleResend}><span>Resend</span>:0:00</button>}
                </div>
                <form onSubmit={handleSubmit}>                    
                    <button type='submit'>
                        Continue
                    </button>
                </form>
                
            </div>
            <div className={styles.rightDiv}>
                <Image
                    src={loginImage}
                    width={500}
                    className={styles.mainImg}
                    alt='Image of laptop'
                />
            </div>
        </div>
    )
}
export default page;