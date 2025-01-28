import { NextResponse } from "next/server";
import connect from '../../../dbConfig/db';
import User from '../../../models/user';

export async function POST(req){
    const data = await req.json();
    const {email} = data;
    console.log("Email: ", email);
    try {
        console.log('Try started');
        connect();
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(!existingUser){
            return new NextResponse({"error":"User not Found"}, {status: 400});
        }
        console.log('API ended');
        return new NextResponse(JSON.stringify({existingUser}), {status:200});
    } catch (error) {
        console.log('Error is Catched in API FindUser: ', error);
        return new NextResponse({"error":error}, {status: 500});
    }
}