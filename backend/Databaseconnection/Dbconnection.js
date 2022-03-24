import mongoose from 'mongoose';
import 'dotenv/config'

const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,()=>{
        console.log("database connected");
    });
}

export default connect