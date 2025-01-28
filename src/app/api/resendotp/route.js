import { NextResponse } from "next/server";
import connect from '../../../dbConfig/db';
import sendMail from '../../../helpers/mail';
import User from '../../../models/user';
export async function POST(req){
    console.log('api continue');
    const data =await req.json();
    const {email} = data;
    console.log('Email: ', email)
    try{
        await connect();
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        const mailResponse = sendMail(email,existingUser._id);
        console.log(mailResponse);
        return new NextResponse(JSON.stringify({'msg':'Email Sent Successfully'}), {status:200});

    }
    catch(error){
        console.log('error Catched')
        console.log(error);
        return new NextResponse(JSON.stringify({msg:error}), {status:500});
    }
}