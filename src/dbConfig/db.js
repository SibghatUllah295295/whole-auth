import mongoose from 'mongoose';

const connect =async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Next-Auth-Users");
        console.log('connected');
    }
    catch(error){
        console.error(`Failed to connect to MongoDB: ${error.message}`);
        process.exit();
    }
}
export default connect;