import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne(
            {
                username,
                isverified: true
            }
        )
        if (existingUserVerifiedByUsername) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username already taken! User already exists with verified username."
                }),
                {
                    status: 400
                }
            )
        }

        const existingUserByEmail = await UserModel.findOne({
            email
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isverified) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: "User already exists with this email."
                    }), { status: 400 }
                )
            } else if (!existingUserByEmail.isverified) {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifycode = verifyCode
                existingUserByEmail.verifycodeexpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        } else {
            // new user, reggister it in database.

            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifycode: verifyCode,
                verifycodeexpiry: expiryDate,
                isaccepting: true,
                isverified: false,
                messages: []
            })

            await newUser.save();
        }

        // send verification email...
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if (!emailResponse.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: emailResponse.message
                }), { status: 500 }
            )
        }
        return new Response(
            JSON.stringify({
                success: true,
                message: "User Registered Successfully! Please Verify your Email."
            }), { status: 201 }
        )
    }
    catch (error) {
        console.error("Error registering user!", error)
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error registering user!"
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}