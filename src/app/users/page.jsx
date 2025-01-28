'use client';
import Link from 'next/link';
import React from "react";
import styles from "./page.module.css";
const Page = () => {
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState({});
    const [display, setDisplay] = React.useState(false);
    const [display2, setDisplay2] = React.useState(false);
    const [showPop, setShowPop] = React.useState(false);
    const [showPop2,setShowPop2] = React.useState(false);
    const [updateData, setUpdateData] = React.useState({ name: "", email: "", isAdmin: "" });
    const [updateData2, setUpdateData2] = React.useState({email:""});
    const [Error, setError] = React.useState("");
    const [Error2, setError2] = React.useState("");
    const togglePop = () => {
        setShowPop(!showPop);
    }
    const togglePop2 = () => {
        setShowPop2(!showPop2);
    }
    const handleChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }
    const handleChange2 = (e) => {
        setUpdateData2({...updateData2, [e.target.name]:e.target.value});
    }
    const getAll = async () => {
        try {
            const res = await fetch('/api/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('api fetching completed');
            const data = await res.json();
            console.log("data", data);
            if (res.status == 200) {
                console.log('Get all users successfully');
                console.log('==============================');
                setError("");
                setUsers(data.users);
                setDisplay(true);
                setDisplay2(false);
            }
        } catch (error) {
            console.log('Error in fetching API:', error);
        }
    }
    const getOne = async (e) => {
        e.preventDefault();
        console.log('handleUpdate2 Started');
        const email = updateData2.email;
        
        if(!updateData2.email ){
            setError('Please fill all the required fields');
            return;
        }
        try {
            const res = await fetch("/api/findUser",{
                method:'POST',
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({email})
            });
            if(res.status == 200){
                setError('');
                console.log('Status: 200');
                const data = await res.json();
                console.log("Data: ",data.existingUser);
                setUser(data.existingUser);
                console.log("Users: ",users);
                setUpdateData2({email:""})
                setDisplay2(true);
                setDisplay(false);
                togglePop2();
            }
            if(res.status == 500){
                setError('Something Went Wrong, Req:500')
            }
            if(res.status == 400){
                setError('User not Found, Check you Email!');
            }
        } catch (error) {
            console.log('Error Caught in HandleUpdate function: ', error);
        }
    }
    const deleteData = async (id) => {
        try {
            const res = await fetch('/api/deletedata', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            if (res.status == 200) {
                console.log('User deleted successfully');
                getAll();
            }
        } catch (error) {
            console.log('Error in deleting API:', error);
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log('handleUpdate Started');
        const name = updateData.name;
        const email = updateData.email;
        const isAdmin = updateData.isAdmin;
        if(!updateData.name || !updateData.email || !updateData.isAdmin){
            setError('Please fill all the required fields');
            return;
        }
        try {
            const res = await fetch("/api/updateuser",{
                method:'POST',
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({name,email,isAdmin})
            });
            if(res.status == 200){
                setError("");
                togglePop();
                setUpdateData({name:"", email:"",isAdmin:""})
                getAll();           
            }
            if(res.status == 500){
                setError('Something Went Wrong, Req:500')
            }
            if(res.status == 400){
                setError('User not Found, Check you Email!');
            }
        } catch (error) {
            console.log('Error Caught in HandleUpdate function: ', error);
        }
    }
    return (
        <div>
            <div className={styles.buttonDiv}>
            <button onClick={getAll}>Get All Users</button>
            <Link href="/register"><button>Create New</button></Link>
            <button onClick = {togglePop2}>Get One</button>
            </div>
            <br />
            <br />
            {
                display &&
                users.map((user) => (
                    <div>
                        <div>
                            <h3 key={user?._id}>Id: {user?._id}</h3>
                            <h3>Username: {user?.name}</h3>
                            <h3>UserEmail: {user?.email}</h3>
                            <h3>IsVerified: {user?.isVerified == true ? "True" : "false"}</h3>
                            <h3>IsAdmin: {user?.isAdmin == true ? "True" : "false"}</h3>
                            <div className = {styles.userDiv}>
                            <button onClick={() => deleteData(user._id)} className={styles.del}>Delete</button>
                            <button onClick={togglePop} className={styles.update}>Update</button>
                            
                            </div>
                            <hr />
                        </div>
                    </div>
                ))
            }

            {
                display2 &&
                <div>
                            <h3 key={user?._id}>Id: {user?._id}</h3>
                            <h3>Username: {user?.name}</h3>
                            <h3>UserEmail: {user?.email}</h3>
                            <h3>IsVerified: {user?.isVerified == true ? "True" : "false"}</h3>
                            <h3>IsAdmin: {user?.isAdmin == true ? "True" : "false"}</h3>
                            <button onClick={() => deleteData(user._id)}>Delete</button>
                            <button onClick={togglePop}>Update</button>
                            <hr />
                </div>
            }

            {
                showPop &&
                <div className={styles.updateDiv}>
                    <form onSubmit={handleUpdate} className={styles.updateForm}>
                        <button className = {styles.cross} onClick={() => togglePop()}>❌</button>
                        <p className = {styles.error}>{Error}</p>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={updateData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={updateData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.isAdmin}>
                            <label htmlFor="isAdmin" >IsAdmin: </label>

                            <input
                                type="text"
                                id="isAdmin"
                                name="isAdmin"
                                placeholder='True or False'
                                value={updateData.isAdmin}
                                onChange={handleChange}
                            />
                        </div>


                        <button type="submit" className={styles.updateBtn}>Update</button>
                    </form>


                </div>
            }
            {
                showPop2 &&
                <div className={styles.updateDiv}>
                    <form onSubmit={getOne} className={styles.updateForm2}>
                    <button className = {styles.cross2} onClick={() => togglePop2()}>❌</button>
                        <p className = {styles.error}>{Error2}</p>
                        
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter Email to Find User"
                                value={updateData2.email}
                                onChange={handleChange2}
                            />
                        </div>

                        <button type="submit" className={styles.updateBtn}>FIND</button>
                    </form>


                </div>
            }

        </div>
    )
}
export default Page;