import { NextResponse } from "next/server";
import { serverApi } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    await serverApi.post("auth/logout", {}, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return NextResponse.json({ message: "Logged out successfully" });
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return NextResponse.json({ message: "Logged out successfully" });
  }
}
