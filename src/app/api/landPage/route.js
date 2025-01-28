import { NextResponse } from 'next/server';
import connect from '../../../dbConfig/db';
import User from '../../../models/user';
export async function POST(req){
    const {data} =await req.json();
    console.log('Data: ', data);
    try {
        await connect();
        const name = data.user.name;
        const email = data.user.email;
        console.log("name: ", name);
        console.log("email: ", email);
        const existingUser = await User.findOne({email});
        if(existingUser){
        return new NextResponse(JSON.stringify({msg: 'User already Exists'}), {status: 401});
        }
        
        console.log('NewUser creation started');
        const newUser = await User.create({ name, email, isVerified:true});
        console.log('NewUser creation Ended');
        console.log("new User: ", newUser);
        return new NextResponse(JSON.stringify({msg: 'User Created Successfully'}), {status: 201});
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({msg: 'Error Catched at POST API'}), {status: 500});
    }
}