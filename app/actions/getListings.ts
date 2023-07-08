import prisma from "@/app/libs/prismadb";

// API call not required as database can be accessed directly
// HOME is Server component, so we can create Actions 
export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

// Loading listings without need for API calls
export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    // query room count
    // transform room count into a definite number using +roomcount
        if (roomCount) {
      query.roomCount = {
        gte: +roomCount // filter out less rooms to get correct result
      }
    }
    // query guest count
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    // query bathroom count
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }
    // query location value
    if (locationValue) {
      query.locationValue = locationValue;
    }

    // filter for date range
    // filter out all listings which have a reservation 
    // in the desired date range
    if (startDate && endDate) {
      query.NOT = { // reverse filterning 
        reservations: {
          some: {
            OR: [
              { 
                // filter out all conflicts in reservation
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              { // if there is a single date reserved in the desired date for the listing
                // the reservation will show no matches
                // as a date within the range is already reserved
                // if the rservation is cancelled
                // free the dates and ensure the reservation is found
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    // fetch all listings and order listings
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    // using safelisting
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    // catch error
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
