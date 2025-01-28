import { NextResponse } from 'next/server';
import connect from '../../../dbConfig/db';
import User from '../../../models/user';
export async function GET() {
    try {
        await connect();
        const users = await User.find();
        console.log('Users: ', users);
        if (!users) {
            return new NextResponse(JSON.stringify({ message: 'No users Found' }), { status: 404 });
        }
        console.log('Users Found');
        return new NextResponse(JSON.stringify({ users }), { status: 200 });
    } catch (error) {
        console.log('Error catched at API: ', error);
        return new NextResponse(JSON.stringify({ 'message': error }), { status: 500 });

    }


}