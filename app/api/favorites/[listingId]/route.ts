import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

// The IParams interface is removed.

export async function POST(
    request: Request,
    // The type is now defined directly here
    { params }: { params: { listingId?: string } }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    
    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    // The type is also defined directly here
    { params }: { params: { listingId?: string } }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds }
    });

    return NextResponse.json(user);
}