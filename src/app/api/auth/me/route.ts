import { NextResponse } from "next/server";
import { jwtUtils } from "@/lib/jwt";

export const GET = async (req: Request) => {
  const cookie = req.headers.get("cookie");
  const token = cookie?.split("token=")[1]?.split(";")[0];

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const decoded = jwtUtils.verify(token);

  if (!decoded) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: decoded });
};
