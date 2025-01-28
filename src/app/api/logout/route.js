import { NextResponse } from "next/server";
export async function GET(){
    try {
    const response = new NextResponse(JSON.stringify({'msg':'User Logged Out Successfully'}),{status:200});
    const data = response.cookies.get("token").value;
    console.log(data);
    response.cookies.delete("token");
    return response;   
    } catch (error) {
        console.log(error);
    return new NextResponse(JSON.stringify({'error':error}),{status:500});
    }
}