'use client';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import github from '../../../public/assets/github.png';
import google from '../../../public/assets/google.svg';
import loginImage from '../../../public/assets/loginImage.svg';
import logo from '../../../public/assets/logo.svg';
import styles from './login.module.css';
export default function Page() {
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({email:'',password:''});
  const router = useRouter();
  const validEmail = (userEmail)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userEmail);
}
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const email = form.email;
    const password = form.password;
    
    if(!validEmail(email)){
    setError('Email is Incorrect');
    return;
    }
    if(password.length < 8 ){
    setError('Password length must be at least 8 characters');
    return;
    }
    try{
      
      const res = await fetch('/api/users',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      })
      if(res.status == 200){
        setForm({email:'',password:''});
        console.log('200 status recieved')
        router.push('/');
        return;
      }
      if(res.status == 201){
        setForm({email:'',password:''});
        router.push('/');
        return;
      }
      if(res.status == 400){
        setError('User Not Found');
        return;
      }
      if(res.status == 401){
        setError('Password is Incorrect');
        return;
      }
      if(res.status == 500){
        setError('Email or Password is incorrect');
        return;
      }
    }
    catch(err){
      console.log(err);
    }
  };
  
  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  }
  return (
    <div className = {styles.mainDiv}>
        <div className = {styles.leftDiv}>
        <Image src={logo} width={70}  alt='logo' className = {styles.logoImage}/><br />
        <h1>Wellcome to the <span>SAMPLE THIS</span></h1>
        <div className = {styles.buttonDiv}>
        <button><Image className={styles.google} src = {google} width={25} height={25} alt='google'/> Sign in with <span>Google</span></button>
        <br/>
        <button><Image className={styles.github} src = {github} width={50} height={50} alt='github'/><span className={styles.innerText}>Sign in with<span>GitHub</span></span> </button>
        </div>
        <form onSubmit={handleSubmit} className = {styles.form}>
        
        <small> or login with email</small>
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
      <small className = {styles.err}>{error}</small>
      </div>
      <div className = {styles.forget}>
          <div>
          <input type="checkbox" />
          <small>Keep Me Signed In</small>
          
          </div>
          
        <div>
          <small>Forgot Password?</small>
        </div>
      </div>
      <button type='submit' className={styles.submit}>Let's Get Started</button>
      <p className={styles.register}>Don't have an account?<Link href='/register'> Register</Link></p>
      <br />
      <small className = {styles.terms}>By signing up, you agree to our <Link href='/terms'>Terms &</Link> </small>
      <small>
        and
      <Link href='/privacy' className={styles.privacy}>Service Privacy Policy</Link>
        </small>
    </form>

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