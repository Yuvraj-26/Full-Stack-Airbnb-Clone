import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

// route for reservations
// post request to create a reservation
export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  // get current user
  const currentUser = await getCurrentUser();

  // if no existing current user
  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  // if no listing ID, no start date, no end date, or no price
  // return invalid error
  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}
