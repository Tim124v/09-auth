import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/lib/api/serverApi";
import { cookies } from "next/headers";
import { parse } from "cookie";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const apiRes = await serverApi.post("auth/register", body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax' as const,
          maxAge: Number(parsed["Max-Age"]),
        };
        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
      }
      return NextResponse.json(apiRes.data);
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data,
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: (error instanceof Error ? error.message : "Registration failed") },
      { status: 500 }
    );
  }
}
