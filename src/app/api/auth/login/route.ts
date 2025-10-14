import { NextResponse } from "next/server";
import { jwtUtils } from "@/lib/jwt";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  // (예시) 유저 검증
  if (email === "test@example.com" && password === "1234") {
    const token = jwtUtils.sign({ email });

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });

    return res;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
};
