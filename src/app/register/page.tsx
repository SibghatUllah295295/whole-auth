'use client';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import github from '../../../public/assets/github.png';
import google from '../../../public/assets/google.svg';
import loginImage from '../../../public/assets/loginImage.svg';
import logo from '../../../public/assets/logo.svg';
import styles from './register.module.css';
export default function Page() {
  const {data}=useSession()
  console.log("Session",data)
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({name:'',email:'',password:'',confirmPass:''});
  const router = useRouter();
  const validEmail = (userEmail:string)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userEmail);
}

  const handleSubmit =async (e:any)=>{
    e.preventDefault();
    const email = form.email;
    const password = form.password;
    const name = form.name;
    const confirmPass = form.confirmPass;
    if(password != confirmPass){
        setError('Passwords do not match');
        return;
    }
    if(!validEmail(email)){
    setError('Email is Incorrect');
    return;
    }
    if(password.length < 8 ){
    setError('Password length must be at least 8 characters');
    return;
    }
    try{
      console.log('data fetching is starting');
      const res = await fetch('/api/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,password})
      })
      const data=await res.json()
      console.log('data fetching is ending');
      if(res.status == 200){
        setForm({name:'',email:'',password:'',confirmPass:''});
        console.log('200 status recieved')
        setError('');
        router.push(`/otp?${form.email}`);
        return;
      }
      if(res.status == 201){
        setForm({name:'',email:'',password:'',confirmPass:''});
        setError('');
        router.push('/otp');
        return;
      }
      if(res.status == 400){
        setError('User already Exists');
        return;
      }
      if(res.status == 500){
        setError('Email or Password is Incorrect');
        return;
      }
    }
    catch(err){
      setError('Something Went Wrong');
    }
  };
  
  const handleChange = (e:any) => {
    setForm({...form,[e.target.name]:e.target.value});
  }
  return (
    <div className = {styles.mainDiv}>
        <div className = {styles.leftDiv}>
        <Image src={logo} width={70}  alt='logo' className = {styles.logoImage}/><br />
        <h1>Create your free account</h1>
        
        <form onSubmit={handleSubmit} className = {styles.form}>
        <div className = {styles.name}>
      <label htmlFor="name">Name</label>  
      <input
      type="text"
      id='name'
      name='name'
      placeholder='Type here'
      value = {form.name}
      onChange={handleChange}
      />
      </div>
      <div className = {styles.email}>
      <label htmlFor="email">Email</label>  
      <input
      type="text"
      id='email'
      name='email'
      placeholder='Type here'
      value = {form.email}
      onChange={handleChange}
      />
      </div>
      <div className={styles.password}>
        <label htmlFor="password">Password</label>
        <input
      type="password"
      id = "password"
      name='password'
      placeholder = 'Enter your Password'
      value = {form.password}
      onChange={handleChange}
      />
      </div>
      <div className={styles.confirmPass}>
        <label htmlFor="confirmPass">Confirm Password</label>
        <input
      type="password"
      id = "confirmPass"
      name='confirmPass'
      placeholder = 'Enter your Password'
      value = {form.confirmPass}
      onChange={handleChange}
      />
      </div>
      <small className = {styles.err}>{error}</small>
      <button type='submit' className={styles.submit}>Let's Get Started</button>
    </form>
    <small className={styles.orText}> or login with email</small>
    <div className = {styles.buttonDiv}>
        <button onClick={() => signIn('google')}><Image className={styles.google} src = {google} width={25} height={25} alt='google'/> Sign in with <span>Google</span></button>
        <br />
        <button onClick={() => signIn('github')}><Image className={styles.github} src = {github} width={50} height={50} alt='github'/><span className={styles.innerText}>Sign in with<span>GitHub</span></span> </button>
        </div>
        <p className={styles.register}>Already have an account?<Link href='/login'> Login</Link></p>
        </div>
        <div className = {styles.rightDiv}>
          <Image
          src = {loginImage}
          width={500}
          className = {styles.mainImg}
          alt='Image of laptop'
          />
        </div>
    </div>
    
  );
}