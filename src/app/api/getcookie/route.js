import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(){
    try {
        const cookieStore = cookies();
        const tokenHash = cookieStore.get('token');
        console.log('Hashed Token: ',tokenHash);
        const token = jwt.verify(tokenHash.value,process.env.JWT_SECRET);
        console.log('token: ', token);
        if(!token){
            return new NextResponse(JSON.stringify("error", 'Token is Undefined'), {status:400});
        }
        return new NextResponse(JSON.stringify(token), {status:200});
    } catch (error) {
        console.log('Error caught at getCookie API: ', error);
        return new NextResponse(JSON.stringify({'error':error}),{status:500});
    }
}