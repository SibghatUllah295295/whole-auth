import nodemailer from 'nodemailer';
import connect from '../dbConfig/db';
import User from '../models/user';
const sendMail = async (email, id) => {
    
        try {
            console.log('connection to db in nodemailer started');
            await connect();
            console.log('connection to db in nodemailer Ended');
    
            const num1 = Math.floor(Math.random() * 10);
            const num2 = Math.floor(Math.random() * 10);
            const num3 = Math.floor(Math.random() * 10);
            const num4 = Math.floor(Math.random() * 10);
            const num5 = Math.floor(Math.random() * 10);
            const number = num1.toString() + num2.toString() + num3.toString() + num4.toString() + num5.toString();
            console.log(number);
            await User.findByIdAndUpdate(id, {
                $set: {
                    verifyToken: number,
                    verifyTokenExpire: Date.now() + 3600000
                }
            })
            console.log('OTP generation Ended in nodemailer ');
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sibghatullah295295@gmail.com',
                    pass: 'fvaiaquyuslcoafa'
                }
            })
            const options = {
                from: 'sibghatullah295295@gmail.com',
                to: email,
                subject: 'Verify your email',
                text: `To verify your email, please Enter the following code: ${number}`
            }
            const result = await transporter.sendMail(options);
            console.log('result from mail.js file:', result);
        }
        catch (error) {
            console.error(`Failed to send mail: ${error.message}`);
            return false;
        }
    }

export default sendMail;