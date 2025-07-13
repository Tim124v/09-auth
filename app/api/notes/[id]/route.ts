import { NextResponse } from "next/server";
import { serverApi } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;
  try {
    const { data } = await serverApi.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch note' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;
  try {
    await serverApi.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete note' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;
  const body = await request.json();
  try {
    const { data } = await serverApi.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (data) {
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update note' }, { status: 500 });
  }
}
