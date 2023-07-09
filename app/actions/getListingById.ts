import prisma from "@/app/libs/prismadb";

// direct communication from server component to database
// create interface
interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
) {
  try {
    const { listingId } = params;

    // use directly 
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing, // sanitise 
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user, // sanitise user from listing
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null, // can be null
      }
    };
    // error handling
  } catch (error: any) {
    throw new Error(error);
  }
}
