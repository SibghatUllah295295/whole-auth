import { NextResponse } from 'next/server';
import connect from '../../../dbConfig/db';
import User from '../../../models/user';

export async function DELETE(req){
    const {id} = await req.json();
    try {
        await connect();
        const user = await User.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify({"message": "User deleted Successfully"}),{status:200});
    } catch (error) {
        console.log('Error at DELETE api: ', error)
        return new NextResponse(JSON.stringify({"error": error}),{status:500});
    }

}