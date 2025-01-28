import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import connect from '../../../dbConfig/db';
import sendMail from '../../../helpers/mail';
import User from '../../../models/comments';
export async function POST(req) {
    const data = await req.json();
    const { name, email, password } = data;
    console.log(name, email, password);
   
    await connect();
    try {
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        
        console.log('if condition started');
        if (existingUser) {
            return new NextResponse(JSON.stringify({ "msg": "User Already Exists" }), { status: 400 });
        }
        console.log('if condition failed');

        const hashedPass = await bcryptjs.hash(password, 10);

        console.log('hashed Password', hashedPass);
        console.log('User creation in Db started');
        const newUser = await User.create({ name, email, password: hashedPass });
        console.log('User creation in Db Ended');
        console.log('Email Sending Started');
        const emailResponse = sendMail(email, newUser._id);
        console.log('Email Send Completed');
        console.log('Email response: ', emailResponse);
    
        console.log('returning response');
        return new NextResponse(JSON.stringify({ 'msg': 'LogIn successfully', success: true }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ "error": error.msg }), { status: 500 });
    }
}