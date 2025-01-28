import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import connect from '../../../dbConfig/db';
import User from '../../../models/user';
export async function POST(req){
    
    
    try {
        const data = await req.json(); 
        const { email, password } = data;
        console.log(email, password);
        await connect();
        const existingUser = await User.findOne({email});
        
        if(!existingUser){
            return new NextResponse(JSON.stringify({'error':'User not Found'}), { status: 400 });
        }
        console.log(existingUser);
        existingUser.isVerified = true;
        existingUser.verifyToken = undefined;
        existingUser.verifyTokenExpire = undefined;
        await existingUser.save();
        
        console.log('condition Started');
            if(await bcryptjs.compare(password,existingUser.password)){
            return new NextResponse(JSON.stringify({"msg": "User Created Successfully"}), {status:201});
            }
            else{
                return new NextResponse(JSON.stringify({'error':'Incorrect Password'}), { status: 401 });
            }
        
        }
         catch (error) {  
        return new NextResponse(JSON.stringify({ message: 'Error creating user' }), { status: 500 });
    }
}
