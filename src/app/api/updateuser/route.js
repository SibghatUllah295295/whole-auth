import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import connect from '../../../dbConfig/db';
import User from '../../../models/user';
export async function POST(req){
    const data = await req.json();
    console.log("Data: ",data);
    const {name,email,isAdmin} = data;
    console.log("Name: ",name,"Email:",email,"isAdmin:",isAdmin);
    try {
        console.log('try STarted');
        connect();
        const existingUser = await User.findOneAndUpdate({email},{name,email,isAdmin});
        console.log(existingUser);
        if(!existingUser){
        console.log('Error in Finding User');
        return new NextResponse({"msg": "User Not Found"}, {status:400});
        }
        const cookieStore = cookies();
        const hashedToken = cookieStore.get('token')?.value;
        console.log('hashed Token', hashedToken);
        let token={};
        try{
        token = jwt.verify(hashedToken, process.env.JWT_SECRET);
        }catch(error){
        console.log('Error in Verifying Token');
        console.log('Error: ',error);
        }
        console.log('Token: ', token);
        console.log('Previouse Token: ', token);
        token.name = existingUser.name;
        token.isAdmin = existingUser.isAdmin; 
        console.log('NewToken Data: ', token);
        const newToken = jwt.sign(token, process.env.JWT_SECRET);
        console.log('New Token: ', newToken);
        cookieStore.set('token', newToken, {
            httpOnly:true
        });
        return new NextResponse({"msg":"User Updated Successfully"}, {status:200});
    } catch (error) {
        console.log('Error Caught in Api of updateData: ', error);
        return new NextResponse({"error":error}, {status:500});
    }
}