// import nextresponse
// route created for un/favouriting properties
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

// request function POST
export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  // get current user
  const currentUser = await getCurrentUser();
  
  // check for current user
  if (!currentUser) {
    return NextResponse.error();
  }

  // extract listing ID from paramaters
  const { listingId } = params;

  // if no listing ID, throw invalid ID error
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // create favouriteID array
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // push new listing ID
  favoriteIds.push(listingId);

  // update user with prisma user update
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  // return response
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // validation if ID Invalid
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}
