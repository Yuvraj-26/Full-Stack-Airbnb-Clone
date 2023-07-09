import prisma from "@/app/libs/prismadb";

// get reservations used in my trips route and my reservations route
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

// get reservation async function
// required to prevent user from reserving dates that
// have been reserved by any user globally
export default async function getReservations(
  params: IParams
) {
  // depending on listingid userid or authorid is sent
  // qeuery as required
  try {
    const { listingId, userId, authorId } = params;

    // query in my trips or by 0Auth ID in my reservations
    // manage all reservations of all users by authoring property
    const query: any = {};
    
    // if listing ID, define query
    // finds all reservations for single listing
    if (listingId) {
      query.listingId = listingId;
    };

    // if userid , define query
    // finds all trips user has in profile
    if (userId) {
      query.userId = userId;
    }

    // if authorid, define query
    // finds all reservations that other users have made for the listings
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
