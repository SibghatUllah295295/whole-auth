import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connect from '../../../dbConfig/db';
import User from '../../../models/user';
export async function POST(req){
    const data = await req.json();
    const {otp} = data;
    console.log('otp: ', otp);
    const cookieStore = cookies();
    try{
        await connect();
        console.log('connection to db in verifyemail started');
        const user = await User.findOne({verifyToken:otp,verifyTokenExpire:{$gt:Date.now()}});
        console.log('user: ', user);
        if(!user){
            return new NextResponse(JSON.stringify({'error':'OTP expired'}), {status:401});
        }
        const data = {
            id: user._id,
            email: user.email,
            isAdmin:user.isAdmin,
            isVerified:user.isVerified
        }
        const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'});
        cookieStore.set('token', token,{
            httpOnly:false
        });
        console.log(user);
        console.log('connection to db in verifyemail ended');
        user.isVerified = true;
        await user.save();
        return new NextResponse(JSON.stringify({'msg':'Email Verified Successfully'}), {status:200});

    }
    catch(error){
        console.log(error);
        return new NextResponse(JSON.stringify({msg:error}), {status:500});
    }
}