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
    // listing is unique
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true
      }
    });

    // if no listing 
    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
