import connect  from "@/dbConfig/dbConfig";
import User  from "@/models/userModel.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const { username, email, password } = req;

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser,
        });
    }
    catch(error) {
        console.error("Error in POST /api/user/signup:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}