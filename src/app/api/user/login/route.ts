import dbConnect  from "@/dbConfig/dbConfig";
import User  from "@/models/userModel.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { email, password } = req;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const tokenData = {
            userId: user._id,
            username: user.username,
            email: user.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"});
        const response = NextResponse.json({ message: "Login successful", success: true }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error) {
        console.error("Error in POST /api/user/login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}